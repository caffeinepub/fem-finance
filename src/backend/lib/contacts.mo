import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/contacts";

module {
  public func add(
    messages : List.List<Types.ContactMessage>,
    nextId : Nat,
    input : Types.ContactMessageInput,
  ) : (Types.ContactMessage, Nat) {
    let msg : Types.ContactMessage = {
      id = nextId;
      name = input.name;
      phone = input.phone;
      message = input.message;
      createdAt = Time.now();
    };
    messages.add(msg);
    (msg, nextId + 1);
  };

  public func listAll(messages : List.List<Types.ContactMessage>) : [Types.ContactMessage] {
    messages.toArray();
  };
};
