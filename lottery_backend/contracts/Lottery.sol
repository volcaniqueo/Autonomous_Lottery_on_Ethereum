// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Lottery{
    
    struct LotteryRound {
        uint totalMoneyCollected;  // stores the total wei amount collected from the sales of tickets for lottery
        mapping(uint => Ticket) tickets;  // stores all tickets for the lottery, key is the ticket number for the ticket
        mapping(uint => Ticket) winningTickets; // stores all winning tickets for the lottery, key is the ticket number for the ticket
        mapping(address => uint[]) addressTickets;  // address -> address's ticket numbers for the lottery
        mapping(bytes32 => uint) validHashes;  // hashed random number -> ticket no mapping
        uint[3] winners;  // ticket numbers of the winning tickets
        uint resultingRandomNumber;  // random number to determine the winner
        uint totalTickets;  // total number of valid (random number revealed) tickets for the lottery
        uint [] randomNumbers;  // all revealed random numbers for the lottery
    }

    struct Ticket {
        address ticket_adress; // address that owns the ticket
        bytes32 hashedRndNumber;  // hash of the ticket's random number
        uint rndNumber;  // random number of the ticket
        uint ticketType; // full -> 1, half -> 2, quarter -> 4
        bool revealed;  // boolean for whether the ticket is revealed
        bool collected;  // boolean for whether the ticket's prize is collected
        uint winAmount;  // the prize for the ticket in wei
    }

    address private owner;  // address that deployed the contract. (Since lottery is autonomous, it has no effect)
    uint public current_PurchaseLottery_no;  // current purchase lottery number
    uint public current_RevealLottery_no;  // current reveal lottery number
    uint256 system_start;  // the time that the contract had been deployed to the blockchain
    mapping (uint => LotteryRound) public lotteries;  // all lotteries, key is the lottery number
    mapping (address => uint) public balances; // balances of all addresses that have deposited ether to the lottery
    uint current_ticket_no = 1;  // tracking to give distinct ticket numbers
    uint money_surplus = 0;  // tracking the money surplus (money left after distribution of prizes)
    uint constant FULL_TICKET_PRICE = 8*1e15 wei;  // price of the full ticket, as given in the description
    event ticketPurchased(uint _ticket_no);  // event to see ticket number when buyTicket is invoked

    /*
    Consturctor for the lottery.
    Current purchase & reveal lottery numbers are initialized
    System start is also initialized to the block's timestamp
    */
    constructor() {
        owner = msg.sender;
        system_start = block.timestamp;
        current_PurchaseLottery_no = 1;
        current_RevealLottery_no = 0; 
    }

    /*
    Function to deposit ether.
    msg.value is added to the user address's balance in the lottery system
    */
    function depositEther() public payable{
        balances[msg.sender] += msg.value;
    }

    /*
    Function created for testing purposes
    Returns balance of the address in msg.sender as wei
    */
    function getBalance() public view returns (uint balance) {
        balance = balances[msg.sender];
    }

    /*
    Function to withdraw ether
    The amnt is deducted from address's (msg.sender) balance and sent to the address (if possible; i.e. amnt <= balances[msg.sender])
    */
    function withdrawEther(uint amnt) public{
            require( amnt <= balances[msg.sender], "Insufficient balance.");
            balances[msg.sender] -= (amnt);
            payable(msg.sender).transfer(amnt);
    }


    /*
    Function to buy ticket
    Since the lottery is autonomous, there is no mechanism to update the current purchase & reveal lottery number unless buyTicket or revealRndNumber or collectTcketRefund is invoked
    So when buyTicket invoked, a check is made to determine whether the system variables (currentPurchaseLottery_no & currentRevealLottery_no) are up-to-date.
    To update the system variables (currentPurchaseLottery_no & currentRevealLottery_no) advanceLottery() is invoked. Details of this function are commented above its definition
    After this, three checkings are made (Implemented as 'require'):
        1.1) Input ticket_type should 1 or 2 or 4, as given in the description
        1.2) User (msg.sender) must have enough balance to purchase the ticket
        1.3) Since every lottery has unique random numbers, (i.e. a random number can be given only once) input hash_rnd_number must be unique for the lottery.
        (But there is no restriction for different lotteries, i.e. lottery 1 and lottery 2 can have common random numbers)
    After checkings, necessary updates are made:
        2.1) User's balance has decreased with the price of the ticket
        2.2) The price of the ticket is added to the totalMoneyCollected variable of the given lottery
        2.3) A new ticket is created with the necessary information and added to the tickets variable of the given lottery
        2.4) The validHashes and addressTickets variables of the given lottery is updated accordingly
        2.5) current_ticket_no variable is incremented by one give distinct numbers for every ticket
        2.6) Event is emitted to see return value of ticket_no
    */
    function buyTicket(bytes32 hash_rnd_number, uint ticket_type) public returns(uint ticket_no){
        if ((block.timestamp - system_start) / 1 weeks != current_RevealLottery_no) {
            advanceLottery();
        }
        require(ticket_type == 1 || ticket_type == 2 || ticket_type == 4, "Invalid ticket type!"); // 1.1
        require(balances[msg.sender] >= FULL_TICKET_PRICE / ticket_type, "Insufficient Balance."); // 1.2
        require(lotteries[current_PurchaseLottery_no].validHashes[hash_rnd_number] == 0, "This number has already given!"); // 1.3
        balances[msg.sender] -= FULL_TICKET_PRICE / ticket_type; // 2.1
        lotteries[current_PurchaseLottery_no].totalMoneyCollected += FULL_TICKET_PRICE / ticket_type; // 2.2
        lotteries[current_PurchaseLottery_no].tickets[current_ticket_no] = Ticket({ // 2.3
            ticket_adress: msg.sender, hashedRndNumber: hash_rnd_number, ticketType: ticket_type, revealed: false, rndNumber: 0, collected: false, winAmount: 0
        });
        lotteries[current_PurchaseLottery_no].validHashes[hash_rnd_number] = current_ticket_no; // 2.4
        lotteries[current_PurchaseLottery_no].addressTickets[msg.sender].push(current_ticket_no); // 2.4
        ticket_no = current_ticket_no;
        current_ticket_no++; // 2.5
        emit ticketPurchased(ticket_no); // 2.6
    }

    /*
    Function to refund the ticket
    Since the lottery is autonomous, there is no mechanism to update the current purchase & reveal lottery number unless buyTicket or revealRndNumber or collectTcketRefund is invoked
    So when collectTicketRefund invoked, a check is made to determine whether the system variables (currentPurchaseLottery_no & currentRevealLottery_no) are up-to-date.
    To update the system variables (currentPurchaseLottery_no & currentRevealLottery_no) advanceLottery() is invoked. Details of this function are commented above its definition
    After this, one checking is made (Implemented as 'require'):
        1.1) The ticket_no must belong to the user and must be bought in the current purchase lottery period
    After checkings, necessary updates are made:
        2.1) The refund (price of the ticket) added to the user's balance in the lottery system
        2.2) totalMoneyCollected variable is decremented by the price, since ticket is refunded
        2.3) validHashed variable of the lottery is updated; since ticket will be deleted, ticket's hashedRndNumber is now free (i.e. the hash is not anymore
        associated with the ticket, can be given by another ticket's hash)
        2.4) Ticket is deleted from the lottery's tickets variable
    Note: Ticket is not deleted from the addressTickets variable of the lottery. So when getLastOwnedTicket or getIthOwnedTicketNo is invoked, user can still see the ticket.
    But since we have three different status (0 -> not revealed, 1 -> revealed, 2 -> collected), the status will be not revealed. This is a design choice, we wanted
    a user to still see the ticket even though it is refunded.
    */
    function collectTicketRefund(uint ticket_no) public {
        if ((block.timestamp - system_start) / 1 weeks != current_RevealLottery_no) {
            advanceLottery();
        }
        require(lotteries[current_PurchaseLottery_no].tickets[ticket_no].ticket_adress == msg.sender, "Ticket is not yours or is not bought in current purchase lottery stage!"); // 1.1
        balances[msg.sender] += FULL_TICKET_PRICE / lotteries[current_PurchaseLottery_no].tickets[ticket_no].ticketType; // 2.1
        lotteries[current_PurchaseLottery_no].totalMoneyCollected -= FULL_TICKET_PRICE / lotteries[current_PurchaseLottery_no].tickets[ticket_no].ticketType; // 2.2
        lotteries[current_PurchaseLottery_no].validHashes[lotteries[current_PurchaseLottery_no].tickets[ticket_no].hashedRndNumber] = 0; // 2.3
        delete lotteries[current_PurchaseLottery_no].tickets[ticket_no]; // 2.4
        
    }

    /*
    Function to reveal random number
    Since the lottery is autonomous, there is no mechanism to update the current purchase & reveal lottery number unless buyTicket or revealRndNumber or collectTcketRefund is invoked
    So when revealRndNumber invoked, a check is made to determine whether the system variables (currentPurchaseLottery_no & currentRevealLottery_no) are up-to-date.
    To update the system variables (currentPurchaseLottery_no & currentRevealLottery_no) advanceLottery() is invoked. Details of this function are commented above its definition
    After this, four checkings are made (Implemented as 'require'):
        1.1) At least one week must be passed after the contract had been deployed. (Since at the first week we only have the purchase period of the first lottery)
        1.2) Ticket's address must be msg.sender and the ticket must be included in the current reveal lottery's tickets mapping
        1.3) Ticket's revealed variable must be False since if it is already revealed this function has no purpose for the ticket
        1.4) Given random number must match the ticket's hashedRndNumber variable (previously given in the buyTicket) (i.e. sha3(random number) == hashedRndNumber)
    After checkings, necessary updates are made:
        2.1) Revealed variable of the ticket is set to True
        2.2) rndNumber variable of the ticket is set to given random number
        2.3) Related with the determination of the random number that is used to determine the winneries of the lottery. Explained in the comments part of the 
        determineWinners() function
        2.4) totalTickets variable of the current reveal lottery is incremented by one
        2.5) random number (rnd_number) is included in the randomNumbers variable of the current reveal lottery
    */
    function  revealRndNumber(uint ticket_no, uint rnd_number) public {
        if ((block.timestamp - system_start) / 1 weeks != current_RevealLottery_no) {
            advanceLottery();
        }
        require(current_RevealLottery_no > 0, "There is not any ongoing reveal stage!"); // 1.1
        require(lotteries[current_RevealLottery_no].tickets[ticket_no].ticket_adress == msg.sender, "Ticket is not yours or the reveal period has been passed or such ticket does not exist!"); // 1.2
        require(!(lotteries[current_RevealLottery_no].tickets[ticket_no].revealed), "You have already revealed this ticket!"); // 1.3
        require(lotteries[current_RevealLottery_no].tickets[ticket_no].hashedRndNumber == keccak256(abi.encodePacked(rnd_number)), "Given random number does not match with initial commit!"); // 1.4
        lotteries[current_RevealLottery_no].tickets[ticket_no].revealed = true; // 2.1
        lotteries[current_RevealLottery_no].tickets[ticket_no].rndNumber = rnd_number; // 2.2
        lotteries[current_RevealLottery_no].resultingRandomNumber = lotteries[current_RevealLottery_no].resultingRandomNumber ^ rnd_number; // 2.3
        lotteries[current_RevealLottery_no].totalTickets ++; // 2.4
        lotteries[current_RevealLottery_no].randomNumbers.push(rnd_number); // 2.5
    }

    /*
    Function to view whether given ticket number has won any prize in the given lottery number
    */
    function checkIfTicketWon(uint lottery_no, uint ticket_number) public view returns (uint amount){
        amount = lotteries[lottery_no].winningTickets[ticket_number].winAmount;
    }

    /*
    Function to view user's (msg.sender) last owned ticket no and its status.
    If the user does not have any tickets for that lottery, ticket no and status are returned as 0
    status 0 -> not revealed or refunded, status 1 -> revealed, status 2 -> collected
    */
    function getLastOwnedTicket(uint lottery_no) public view returns (uint ticket_no, uint status) {
        if (lotteries[lottery_no].addressTickets[msg.sender].length == 0) {
            ticket_no = 0;
            status = 0;
        }
        else{
            ticket_no = lotteries[lottery_no].addressTickets[msg.sender][lotteries[lottery_no].addressTickets[msg.sender].length - 1];
            if (lotteries[lottery_no].tickets[ticket_no].revealed) {
                if (lotteries[lottery_no].tickets[ticket_no].collected) {
                    status = 2;
                } else {
                    status = 1;
                }
            } else {
                status = 0;
            }
        }
    }

    /*
    Function to view user's (msg.sender) ith owned ticket no and its status.
    If the user does not have any tickets for that lottery, ticket no and status are returned as 0
    status 0 -> not revealed or refunded, status 1 -> revealed, status 2 -> collected
    */
    function getIthOwnedTicketNo(uint i, uint lottery_no) public view returns (uint ticket_no, uint status) {
        if (lotteries[lottery_no].addressTickets[msg.sender].length < i) {
            ticket_no = 0;
            status = 0;
        }
        else{
            ticket_no = lotteries[lottery_no].addressTickets[msg.sender][i - 1];
            if (lotteries[lottery_no].tickets[ticket_no].revealed) {
                if (lotteries[lottery_no].tickets[ticket_no].collected) {
                    status = 2;
                } else {
                    status = 1;
                }
            } else {
                status = 0;
            }
        }
    }

    /*
    This is a private function for lottery to maintain the current week.
    Since the lottery is autonomus and a smart contract can not invoke one of its functions by itself, the call of this function
    is made in buyTicket, revealRndNumber and collectTicketRefund; whenever time-sensitive variables of current_RevealLottery_no & current_PurchaseLottery_no
    are outdated. The time difference between current block's timestamp and the system_start (the time when the contract had been deployed) is calculated
    and the variables current_RevealLottery_no & current_PurchaseLottery_no are set accordingly. Also determineWinners function is invoked.
    */
    function advanceLottery() private {
        if ((current_RevealLottery_no > 0) && (lotteries[current_RevealLottery_no].totalTickets > 0)) {
            determineWinners(current_RevealLottery_no);
        }
        uint256 timePassed = block.timestamp - system_start;
        uint incrementLottery = timePassed / 1 weeks;
        current_PurchaseLottery_no = incrementLottery + 1;
        current_RevealLottery_no = incrementLottery;
    }

    /*
    Function to collect the prize of the ticket
    After this, three checkings are made (Implemented as 'require'):
        1.1) Specified ticket number must win a prize in the given lottery
        1.2) Only the owner address of the ticket can invoke the collection of the prize for the given ticket number
        1.3) Ticket's prize can only be collected once
    After checkings, necessary updates are made:
        2.1) The prize amount is added to the user's balance in the system
        2.2) Ticket's collected variable is set to True
    */
    function collectTicketPrize(uint lottery_no, uint ticket_no) public {
        require(lotteries[lottery_no].winningTickets[ticket_no].winAmount != 0, "Ticket did not win anything!"); // 1.1
        require(msg.sender == lotteries[lottery_no].tickets[ticket_no].ticket_adress, "Only the owner of the ticket can collect the prize!"); // 1.2
        require(lotteries[lottery_no].tickets[ticket_no].collected == false, "You already collected the ticket prize!"); // 1.3
        balances[msg.sender] += lotteries[lottery_no].winningTickets[ticket_no].winAmount; // 2.1
        lotteries[lottery_no].tickets[ticket_no].collected = true; // 2.2
    }

    /*
    Function to get the ith winning ticket and its prize
    If the given index is > 3 or index is <= 0 (0,0) is returned
    If the given lottery number is <= 0 or not finished its reveal stage yet, (0,0) is returned
    */
    function getIthWinningTicket(uint i, uint lottery_no) public view returns (uint ticket_no, uint amount) {
        if (i > 3 || i <= 0 || lottery_no >= current_RevealLottery_no || lottery_no <= 0) {
            ticket_no = 0;
            amount = 0;
        }
        else{
            ticket_no = lotteries[lottery_no].winners[i - 1];
            amount = lotteries[lottery_no].tickets[ticket_no].winAmount;
        }
    }

    /*
    Function to get the lottery numbers that are in the purchase and reveal stage for the given time
    If the time is lower than the time when the contract had been deployed, (0,0) is returned
    lottery_no1 is the number of lottery that is in the purchase stage
    lottery_no2 is the number of lottery that is in the reveal stage
    Calculation method is the same as advanceLottery() function
    */
    function getLotteryNos(uint unixtimeinweek) public view returns (uint lottery_no1, uint lottery_no2) {
        if (unixtimeinweek < system_start) {
            lottery_no1 = 0;
            lottery_no2 = 0;
        }
        else {
            uint256 timePassed = unixtimeinweek - system_start;
            uint incrementLottery = timePassed / 1 weeks;
            lottery_no1 = incrementLottery + 1;
            lottery_no2 = incrementLottery;
        }
    }

    /*
    Function to view total collected money from the sales of tickets for the given lottery number
    If the given lottery number is negative or zero, 0 is returned
    */
    function getTotalLotteryMoneyCollected(uint lottery_no) public view returns (uint amount) {
        if (lottery_no <= 0) {
            amount = 0;
        }
        else {
            amount = lotteries[lottery_no].totalMoneyCollected;
        }
    }

    /*
    This function is used to determine winners of the given lottery
    We used XOR operation to generate resultingRandomNumber for the lottery. Each time revealRndNumber is invoked current resultingRandomNumber variable
    for the given lottery is XOR'ed with the given random number in the revealRndNumber function. In the determineWinners function, resultingRandomNumber is used to determine
    first winner: resultingRandomNumber % totalTickets determines the 'index' of the first winner from the randomNumbers variable of the lottery. We then find the ticket number of
    the random number from the validHashes mapping. To determine second winner, resultingRandomNumber is XOR'ed with the first winner's random number.
    Then used to find the index as in first winner. Same applies for the third ticket, second winner's random number is XOR'ed with the resultingRandomNumber
    and then used to find the index as in first winner. Now the winner ticket numbers are determined.
    After winning ticket numbers are determined, winners array of the current lottery is modified with these ticket numbers. Then the prize amounts of the tickets 
    is calculated with the formula given in the project description. winAmount variables of the winning tickets modified accordingly with these values.
    Finally money surplus is calculated and winningTickets mapping of the current lottery modified accordingly.
    Note: From the way that we calculate the winners, it is possible for a ticket number to win more than one prize. (e.g. one ticket number can be both
    first winner and third winner) We wanted to allow this, because it is just by chance :)
    */
    function determineWinners(uint _current_RevealLottery_no) private {

        uint M = lotteries[_current_RevealLottery_no].totalMoneyCollected + money_surplus;
        uint firstWinner = lotteries[_current_RevealLottery_no].randomNumbers[(lotteries[_current_RevealLottery_no].resultingRandomNumber % lotteries[_current_RevealLottery_no].totalTickets)];
        lotteries[_current_RevealLottery_no].resultingRandomNumber = lotteries[_current_RevealLottery_no].resultingRandomNumber ^ firstWinner;
        uint secondWinner = lotteries[_current_RevealLottery_no].randomNumbers[(lotteries[_current_RevealLottery_no].resultingRandomNumber % lotteries[_current_RevealLottery_no].totalTickets)];
        lotteries[_current_RevealLottery_no].resultingRandomNumber = lotteries[_current_RevealLottery_no].resultingRandomNumber ^ secondWinner;
        uint thirdWinner = lotteries[_current_RevealLottery_no].randomNumbers[(lotteries[_current_RevealLottery_no].resultingRandomNumber % lotteries[_current_RevealLottery_no].totalTickets)];

        uint firstWinnerTicketNo = lotteries[_current_RevealLottery_no].validHashes[keccak256(abi.encodePacked(firstWinner))];
        uint secondWinnerTicketNo = lotteries[_current_RevealLottery_no].validHashes[keccak256(abi.encodePacked(secondWinner))];
        uint thirdWinnerTicketNo = lotteries[_current_RevealLottery_no].validHashes[keccak256(abi.encodePacked(thirdWinner))];

        lotteries[_current_RevealLottery_no].winners[0] = firstWinnerTicketNo;
        lotteries[_current_RevealLottery_no].winners[1] = secondWinnerTicketNo;
        lotteries[_current_RevealLottery_no].winners[2] = thirdWinnerTicketNo;

        uint firstPrize = M / (2 * lotteries[_current_RevealLottery_no].tickets[firstWinnerTicketNo].ticketType);
        uint secondPrize = M / (4 * lotteries[_current_RevealLottery_no].tickets[secondWinnerTicketNo].ticketType);
        uint thirdPrize = M / (8 * lotteries[_current_RevealLottery_no].tickets[thirdWinnerTicketNo].ticketType);

        lotteries[_current_RevealLottery_no].tickets[firstWinnerTicketNo].winAmount += firstPrize;
        lotteries[_current_RevealLottery_no].tickets[secondWinnerTicketNo].winAmount += secondPrize;
        lotteries[_current_RevealLottery_no].tickets[thirdWinnerTicketNo].winAmount += thirdPrize;

        uint totalPaid = firstPrize + secondPrize + thirdPrize;
        money_surplus = M - totalPaid;

        lotteries[_current_RevealLottery_no].winningTickets[firstWinnerTicketNo] = lotteries[_current_RevealLottery_no].tickets[firstWinnerTicketNo];
        lotteries[_current_RevealLottery_no].winningTickets[secondWinnerTicketNo] = lotteries[_current_RevealLottery_no].tickets[secondWinnerTicketNo];
        lotteries[_current_RevealLottery_no].winningTickets[thirdWinnerTicketNo] = lotteries[_current_RevealLottery_no].tickets[thirdWinnerTicketNo];
    }
    }
