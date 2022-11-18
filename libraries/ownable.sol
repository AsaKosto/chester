abstract contract Ownable {
    address private _owner;

    constructor() {
        _owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _; // executes the body of the function at this point 
    }
}
