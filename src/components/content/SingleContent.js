import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Chip from "@material-ui/core/Chip";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 690,
    backgroundColor: "ghostwhite"
  },
  featured: {
    maxWidth: 690,
    background: "rgb(134, 121, 121)",
    background: "#8a99a6",
    color: "ghostwhite"
    /* background: '-webkit-linear-gradient(to right, #6f0000, #200122)',
        background: 'linear-gradient(to right, #6f0000, #200122)' */
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  table: {
    minWidth: 650
  }
}));

export default function SingleContent(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Grid item xs={12} sm={6}>
      <Card className={props.post.featured ? classes.featured : classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.post.creator.username.substring(0, 1).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.post.creator.username}
          subheader={moment(props.post.date).fromNow()}
        />
        <CardMedia
          className={classes.media}
          image={`http://skp-datastore.s3-eu-west-1.amazonaws.com/${props.post.image.url}`}
          title={props.post.message}
              />
              
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.post.image.tags.map(tag => {
              return (
                <Chip
                  key={tag.name}
                  /* icon={icon} */
                  label={tag.name}
                  className={classes.chip}
                />
              );
            })}
          </Typography>
              </CardContent>
              <hr></hr>
        <CardContent>
          <Typography variant="caption">{props.post.message}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
                  </IconButton>
                  
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
                  >
                      Metadata
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Metadata</TableCell>
                    <TableCell align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.post.image.metadata != undefined
                    ? Object.keys(props.post.image.metadata).map(key => {
                        return (
                          <TableRow key={key}>
                            <TableCell component="th" scope="row">
                              {key}
                            </TableCell>
                            <TableCell align="right">
                              {props.post.image.metadata[key]}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
