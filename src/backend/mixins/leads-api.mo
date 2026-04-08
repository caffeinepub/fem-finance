import List "mo:core/List";
import LeadsLib "../lib/leads";
import Types "../types/leads";

mixin (
  leads : List.List<Types.Lead>,
) {
  var nextLeadId : Nat = 0;

  public func submitLead(input : Types.LeadInput) : async Types.Lead {
    let (lead, newId) = LeadsLib.add(leads, nextLeadId, input);
    nextLeadId := newId;
    lead;
  };

  public query func getLeads() : async [Types.Lead] {
    LeadsLib.listAll(leads);
  };
};
