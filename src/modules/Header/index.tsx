import React, { Fragment, useEffect, useState } from 'react';
import {
   AppBar as MaterialAppBar,
   IconButton,
   Toolbar,
   Typography,
   makeStyles,
   Grid,
   Button,
   Hidden,
   useMediaQuery,
   Drawer,
   Menu,
   useScrollTrigger,
   CssBaseline,
   Slide,
   ListItemIcon,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import HeaderItem from './Item';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import MenuIcon from '@material-ui/icons/Menu';
import { MyTheme } from '../../styles/config';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../store/actions/user';
import SearchBar from '../../components/SearchBar';
import MyDrawer from './drawer';
import CustomAvatar from '../../components/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StyledMenuItem from '../../components/MenuItem';

const useStyles = makeStyles((theme: MyTheme) => ({
   root: {
      fontSize: '1.2rem',
      flexGrow: 1,
      height: 60,
      // color: "#C6B4CE",
      background: theme.colorPalette.primary.main,
   },
   paper: {
      backgroundColor: theme.colorPalette.primary.main,
      color: theme.colorPalette.secondary,
   },
   title: {
      flexGrow: 3,
      fontWeight: 'bold',
   },
   rightPanelContainer: {
      flexGrow: 1,
      fontWeight: 'bold',
   },

   createIcon: {
      fontSize: '1.3rem',
      color: '#fff',
      [theme.breakpoints.down('sm')]: {
         display: 'none',
      },
   },
   drawer: {},
   MenuButton: {
      fontSize: '1.3rem',
      color: '#fff',
      [theme.breakpoints.up('md')]: {
         display: 'none',
      },
   },
   headerTitle: {},
   subtitle: {},
   titleContainer: {
      transition: 'all .7s',
      '&:hover': {
         color: theme.colorPalette.secondary,
         transform: 'scale(1.04)',
         cursor: 'pointer',
      },
   },
   menuPaper: {
      backgroundColor: theme.colorPalette.secondary,
      minWidth: 140,
   },
   loginButton: {
      fontSize: '1rem',
      color: '#fff',
      marginRight: 10,
      backgroundColor: theme.colorPalette.primary.main,
      border: '1px solid' + theme.colorPalette.primary.light,
      textTransform: 'none',
      '&:hover': {
         backgroundColor: theme.colorPalette.secondary,
      },
   },
}));

const APP_BAR_ITEMS = [
   {
      title: 'Home',
      url: '/',
      icon: <HomeIcon />,
   },
   {
      title: 'About',
      url: '/about',
      icon: <InfoIcon />,
   },
   {
      title: 'Contact',
      url: '/contact',
      icon: <ContactSupportIcon />,
   },
   {
      title: 'Contributors',
      url: '/contributors',
      icon: <AllInclusiveIcon />,
   },
];

const AUTHORIZED_APP_BAR_ITEMS = [
   {
      title: 'add new post 🤠',
      url: '/add-new-post',
      icon: <AccountCircleIcon />,
   },
];

// Types
interface Props {
   window?: () => Window;
   children?: React.ReactElement;
   authorized?: boolean;
}

function HideOnScroll(props: Props) {
   const { children, window } = props;
   const trigger = useScrollTrigger({ target: window ? window() : undefined });

   return (
      <Slide appear={false} direction='down' in={!trigger}>
         {children}
      </Slide>
   );
}
// Return
const AppBar = (props: Props) => {
   // useTheme
   const theme = useTheme();
   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
   const dispatch = useDispatch();
   const authorized = useSelector((state: any) => state.userReducer.token);
   const user = useSelector((state: any) => state.userReducer.user);
   const classes = useStyles();
   const history = useHistory();
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [openDrawer, setOpenDrawer] = useState<boolean>();

   const handleClickItem = (url: string) => {
      history.push(url);
   };

   const handleProfileMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
   };

   useEffect(() => {
      setOpenDrawer(false);
   }, [isSmallScreen]);
   const openLoginDialog = () => {
      history.push('/sign-in');
   };

   const handleChangeDrawer = () => {
      setOpenDrawer(!openDrawer);
   };

   const handleLogoutUser = () => {
      dispatch({
         type: LOGOUT,
      });
   };

   return (
      <Fragment>
         <CssBaseline />
         <HideOnScroll {...props}>
            <MaterialAppBar position='sticky' className={classes.root}>
               <Toolbar variant='dense'>
                  <Grid container xs={12} justifyContent='space-between' alignItems='center'>
                     <Grid
                        direction='row'
                        alignItems='center'
                        container
                        item
                        className={classes.title}
                        xs={isSmallScreen ? 7 : 3}
                     >
                        <IconButton className={classes.MenuButton} onClick={handleChangeDrawer}>
                           <MenuIcon />
                        </IconButton>
                        <Grid
                           item
                           direction='column'
                           onClick={() => history.push('/')}
                           className={classes.titleContainer}
                        >
                           <Typography variant='h6' className={classes.headerTitle}>
                              blogify.
                           </Typography>
                           <Typography variant='subtitle2' className={classes.subtitle}>
                              share blog and more
                           </Typography>
                        </Grid>
                     </Grid>
                     <Drawer
                        open={openDrawer}
                        variant='temporary'
                        onClose={handleChangeDrawer}
                        ModalProps={{
                           keepMounted: true,
                        }}
                        className={classes.drawer}
                        classes={{
                           paper: classes.paper,
                        }}
                     >
                        <MyDrawer
                           authorized={authorized}
                           handleChangeDrawer={handleChangeDrawer}
                           handleClickItem={handleClickItem}
                           handleLogoutUser={handleLogoutUser}
                           authorizedItems={APP_BAR_ITEMS}
                        />
                     </Drawer>

                     <Hidden xsDown smDown>
                        <Fragment>
                           <Grid
                              direction='row'
                              alignItems='center'
                              container
                              justifyContent={authorized ? 'flex-end' : 'center'}
                              item
                              className={classes.title}
                              xs={6}
                           >
                              {authorized
                                 ? AUTHORIZED_APP_BAR_ITEMS.map((item) => (
                                      <Fragment>
                                         <Grid xs={6} container>
                                            <SearchBar
                                               fullWidth
                                               onChange={(e) => console.log(e.target.value)}
                                               color='secondary'
                                               size='small'
                                            />
                                         </Grid>
                                         <HeaderItem
                                            title={item.title}
                                            onClick={() => handleClickItem(item.url)}
                                            style={{ marginRight: 15 }}
                                            icon={item.icon}
                                            disableRipple
                                         />
                                         <IconButton onClick={handleProfileMenu}>
                                            <CustomAvatar size='small' color='red'>
                                               {user.username[0].toUpperCase()}
                                            </CustomAvatar>
                                         </IconButton>
                                         <Menu
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={() => setAnchorEl(null)}
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            PaperProps={{
                                               className: classes.menuPaper,
                                               elevation: 4,
                                            }}
                                         >
                                            <StyledMenuItem
                                               onClick={() => {
                                                  setAnchorEl(null);
                                                  history.push('/profile');
                                               }}
                                            >
                                               my profile
                                            </StyledMenuItem>
                                            <StyledMenuItem onClick={handleLogoutUser}>
                                               logout
                                               <ListItemIcon>
                                                  <ExitToAppIcon></ExitToAppIcon>
                                               </ListItemIcon>
                                            </StyledMenuItem>
                                         </Menu>
                                      </Fragment>
                                   ))
                                 : APP_BAR_ITEMS.map((item) => (
                                      <Fragment>
                                         <HeaderItem
                                            title={item.title}
                                            onClick={() => handleClickItem(item.url)}
                                            style={{ marginRight: 15 }}
                                            icon={item.icon}
                                            disableRipple
                                         />
                                      </Fragment>
                                   ))}
                           </Grid>
                           {!authorized && (
                              <Grid
                                 direction='row'
                                 alignItems='center'
                                 container
                                 className={classes.rightPanelContainer}
                                 justifyContent='flex-end'
                                 xs={3}
                              >
                                 <Button variant='text' onClick={openLoginDialog} className={classes.loginButton}>
                                    sign in
                                 </Button>
                              </Grid>
                           )}
                        </Fragment>
                     </Hidden>
                  </Grid>
               </Toolbar>
            </MaterialAppBar>
         </HideOnScroll>
      </Fragment>
   );
};

export default AppBar;
