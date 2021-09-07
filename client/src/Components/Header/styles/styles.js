import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    logo: {
      marginLeft: '3em',
      marginRight: '1em',
      width: 147,
    },
    burgermenu: {
      cursor: 'pointer',
      marginRight: '2em',
      display: 'none',
      width: '4em',
      height: '2.9em',
      borderRadius: '0.8em',
      paddingLeft: '1em',
      '@media (max-width: 1240px)': { 
        display: 'block',
        color: 'white'
      },
      '&:hover': {
        backgroundColor: 'white',
      }
    },
    bar1: {
      width: '35px',
      height: '5px',
      backgroundColor: '#2c3e50',
      margin: '6px 0',
      transition: '0.4s',
    },
    bar2: {
      width: '35px',
      height: '5px',
      backgroundColor: '#2c3e50',
      margin: '6px 0',
      transition: '0.4s',
    },
    bar3: {
      width: '35px',
      height: '5px',
      backgroundColor: '#2c3e50',
      margin: '6px 0',
      transition: '0.4s',
    },
    nav_container: {
      backgroundColor: '#f4d03f',
      width: '100%',
      height: '4.5em',
      display: 'flex',
      justifyContent: 'space-between',
    },
    nav_link_area: {
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'space-between', 
      width: '100%' ,
      padding: '2em',
      '@media (max-width: 1240px)': { 
        //width: 0 ,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 0
      },
    },
    hidden_nav: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f4d03f',
      padding: '2em 0 2em',
      '@media (min-width: 1241px)': { 
        display: 'none'
      },
    },
    nav_link: {
      color: '#2c3e50',
      padding: '0.4em 1.5em',
      borderRadius: '0.5em',
      fontSize: '1.4rem',
      fontWeight: 'bold',
      '&:hover': {
        background: '#2c3e50',
        color: 'white',
        textDecoration: 'none',
      },
      '@media (max-width: 1240px)': { 
        display: 'none'
      }
    },
    nav_link2: {
      color: '#2c3e50',
      padding: '0.4em 1.5em',
      borderRadius: '0.5em',
      fontSize: '1.4rem',
      fontWeight: 'bold',
          '&:hover': {
            background: '#2c3e50',
            color: 'white',
            textDecoration: 'none',
          },
    },
    profile_login: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 0
    },
    login_container: {
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-evenly',
      '@media (max-width: 1240px)': { 
        display: 'none'
      }
    },
    my_account_container: {
      display: 'flex',
      justifyContent: 'space-between',
      '@media (max-width: 1240px)': { 
        display: 'none'
      }
    },
    btn_login: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.4rem',
      border: '1px solid #2c3e50',
      background: '#2c3e50',
      borderRadius: '0.5em',
      height: '1.9em',
      color: 'white',
      '&:hover': {
        background: '#5D6D7E',
        color: 'white',
        textDecoration: 'none',
      }
    },
    btn_my_account: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.4rem',
      border: '1px solid #2c3e50',
      background: '#2c3e50',
      borderRadius: '0.5em',
      height: '2em',
      color: 'white',
      padding: '1em',
      paddingRight: '1.6em',
      '&:hover': {
        background: '#5D6D7E',
        textDecoration: 'none',
      }
    },
    btn_drop: {
      display: 'flex', 
      justifyContent: 'flex-end', 
      alignItems: 'center',
      '@media (max-width: 1240px)': { 
        display: 'none'
      }
    },
    dropdown_link: {
      color: '#2c3e50',
      '&:hover': {
        color: 'white',
        textDecoration: 'none',
      }
    },
    dropdown_item: {
      color: '#2c3e50',
      fontSize: '1.4rem',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        background: '#2c3e50',
        color: 'white',
      },
    },
  }));