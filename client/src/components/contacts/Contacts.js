import React, { useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import AuthContext from "../../context/auth/authContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);

  const { contacts, getContacts } = contactContext;
  const { isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      getContacts();
    }
  }, [isAuthenticated]);
  // useEffect(() => {
  //   if (contacts.length > 0) {
  //     getContacts();
  //   }
  // }, [contacts]);
  return (
    <>
      {isAuthenticated ? (
        contacts ? (
          contacts.map(contact => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        ) : (
          <h1>No Contacts</h1>
        )
      ) : (
        <h1>You are not logged in</h1>
      )}
    </>
  );
};

export default Contacts;
