import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import contactContext from "../../context/contact/contactContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: theme.spacing(2, 0),
    backgroundColor: "silver"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    lineHeight: "2em"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  justifyContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "100%",
    position: "relative"
  },
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const ContactItem = ({ contact }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const contactcontext = useContext(contactContext);

  const { deleteContact, msg, setCurrentContact } = contactcontext;

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const setCurrentUser = () => {
    setCurrentContact(contact._id);
  };

  const delteCnt = () => {
    deleteContact(contact._id);
  };
  return (
    <div className={classes.root}>
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.justifyContent}
        >
          <Typography className={classes.heading}>{contact.name}</Typography>
          <Chip
            // avatar={<Avatar>{contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}</Avatar>}
            label={`${contact.type[0].toUpperCase()}${contact.type.slice(1)}`}
            className={classes.chip}
            color={contact.type === "professional" ? "primary" : "secondary"}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List className={classes.list}>
            {contact.email && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Email:" secondary={contact.email} />
              </ListItem>
            )}
            <Divider />
            {contact.phone && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PhoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Phone:" secondary={contact.phone} />
              </ListItem>
            )}
            <Button
              variant="contained"
              size="small"
              color="secondary"
              className={classes.button}
              onClick={delteCnt}
            >
              Delete
              <DeleteIcon className={classes.rightIcon} />
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.button}
              onClick={setCurrentUser}
            >
              Edit
              {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
              <EditIcon className={classes.rightIcon}>send</EditIcon>
            </Button>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default ContactItem;
