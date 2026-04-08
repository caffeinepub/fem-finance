import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/leads";

module {
  public func add(
    leads : List.List<Types.Lead>,
    nextId : Nat,
    input : Types.LeadInput,
  ) : (Types.Lead, Nat) {
    let lead : Types.Lead = {
      id = nextId;
      name = input.name;
      phone = input.phone;
      city = input.city;
      serviceTag = input.serviceTag;
      createdAt = Time.now();
    };
    leads.add(lead);
    (lead, nextId + 1);
  };

  public func listAll(leads : List.List<Types.Lead>) : [Types.Lead] {
    leads.toArray();
  };
};
