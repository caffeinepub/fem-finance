import Common "common";

module {
  public type ContactMessage = {
    id : Common.ContactId;
    name : Text;
    phone : Text;
    message : Text;
    createdAt : Common.Timestamp;
  };

  public type ContactMessageInput = {
    name : Text;
    phone : Text;
    message : Text;
  };
};
