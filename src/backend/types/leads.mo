import Common "common";

module {
  public type Lead = {
    id : Common.LeadId;
    name : Text;
    phone : Text;
    city : Text;
    serviceTag : ?Text;
    createdAt : Common.Timestamp;
  };

  public type LeadInput = {
    name : Text;
    phone : Text;
    city : Text;
    serviceTag : ?Text;
  };
};
