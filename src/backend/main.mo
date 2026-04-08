import List "mo:core/List";
import LeadTypes "types/leads";
import ContactTypes "types/contacts";
import LeadsApiMixin "mixins/leads-api";
import ContactsApiMixin "mixins/contacts-api";

actor {
  let leads = List.empty<LeadTypes.Lead>();
  let contactMessages = List.empty<ContactTypes.ContactMessage>();

  include LeadsApiMixin(leads);
  include ContactsApiMixin(contactMessages);
};
