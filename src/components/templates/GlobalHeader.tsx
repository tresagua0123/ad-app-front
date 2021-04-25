import React, {useState} from 'react';
import styled from "styled-components";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ReactComponent as LoginButton } from "src/images/btn_google_signin_light_normal_web.svg"
import { signInWithGoogle } from "src/components/templates/Auth";
import firebase from 'firebase/app';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

type Props = {
  onClick?: () => void;
 }

const GlobalHeader: React.FC<Props> = ({onClick}) => {

  const [user, setUser] = useState<any>({});
  console.log(user)

  const signInWithGoogle = () => {
    // Googleプロバイダオブジェクトのインスタンスを作成
    const provider = new firebase.auth.GoogleAuthProvider()
    // ポップアップウィンドウでログインを行う場合はsignInWithPopupを呼び出す
    firebase.auth().signInWithPopup(provider)
    .then(async user => {
        console.log(user)
        console.log(user.user?.photoURL)
        if(user.additionalUserInfo && user.user) {alert("success : " + user.user.displayName + "さんでログインしました");
    railsLogin(user.additionalUserInfo.isNewUser, await user.user?.getIdToken())
    };
      })
      .catch(error => {
          alert(error.message);
      });
}

const csrfTokenObj = () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')
    return { "X-CSRF-TOKEN": csrfToken };
  }
  
  const authorizationObj = (idToken: string) => {
    return { "Authorization": `Bearer ${idToken}` };
  }

const railsLogin = async (isNewUser: boolean, idToken: string) => {
    // const url = isNewUser ? "/accounts" : "/login";
    const url = "/accounts";

    axios.post(`${process.env.REACT_APP_FIREBASE_API_ENDPOINT}${url}`, { data: {} }, {
        headers: { ...csrfTokenObj(), ...authorizationObj(idToken)},
    })
    .then(res => {
        console.log(res.data)
        setUser(res.data);
    },
    error => {
        console.log(error.message)
    });
}

    const classes = useStyles();
    const isEmpty = (obj: any) => !Object.keys(obj).length;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            {isEmpty(user) ?  <LoginButton  onClick={signInWithGoogle}/> : <Avatar src={user.photo_url}/>}
            {/* <img src="public/btn_google_signin_light_normal_web.png" /> */}
            {/* <Button color="inherit"><img src="public/btn_google_signin_light_normal_web.png"></img></Button> */}
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default GlobalHeader;