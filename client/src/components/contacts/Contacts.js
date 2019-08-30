import React, { useContext, useState, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const [contacts] = useContext(contactContext);

  const [users, setUsers] = useState(contacts);

  //   useEffect(() => {
  //     setUsers(contacts);
  //     console.log(users);
  //   }, []);
  return <div>Contacts</div>;
};

export default Contacts;
