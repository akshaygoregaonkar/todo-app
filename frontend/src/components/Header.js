import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import EmailIcon from '@material-ui/icons/Email';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  


function Header(props){
    const classes = useStyles();
    return(
      
              <div> 
            <AppBar position="static">
        <Toolbar>
        
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        Username <EmailIcon/> : {props.username}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            To do App
          </Typography>
          <h3><Link color="white" to='/logout'> Logout</Link></h3>
        </Toolbar>
      </AppBar>
            </div>
            
     
    )
}
const mapStateToProps = state => ({
    username:state.authentication.username})
export default connect(mapStateToProps)(Header)