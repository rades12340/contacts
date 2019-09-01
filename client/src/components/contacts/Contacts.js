import React, { useContext, useState, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;

  return (
    <>
      {contacts.length > 0 ? (
        contacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))
      ) : (
        <h1>No Contacts</h1>
      )}
    </>
  );
};

export default Contacts;
