import React from 'react';
import firebase from 'firebase/app';
import axios from 'axios';

export const Auth: React.FC = () => {

    const signInWithGoogle = () => {
        // Googleプロバイダオブジェクトのインスタンスを作成
        const provider = new firebase.auth.GoogleAuthProvider()
        // ポップアップウィンドウでログインを行う場合はsignInWithPopupを呼び出す
        firebase.auth().signInWithPopup(provider)
        .then(user => {
            console.log(user)
            if(user.additionalUserInfo && user.user) {alert("success : " + user.user.displayName + "さんでログインしました")
        railsLogin(user.additionalUserInfo.isNewUser, user.user.uid)
        };
          })
          .catch(error => {
              alert(error.message);
          });
    }

    // header情報を含めるときに以下のような関数を検討。
    // const csrfTokenObj = () => {
    //     return { "X-CSRF-TOKEN": ('meta[name="csrf-token"]').('content') };
    //   }
      
    //   const authorizationObj = (idToken: string) => {
    //     return { "Authorization": `Bearer ${idToken}` };
    //   }

    const railsLogin = (isNewUser: boolean, idToken: string) => {
        const url = isNewUser ? "/accounts" : "/login";
        axios.post(`${process.env.REACT_APP_FIREBASE_API_ENDPOINT}${url}`)
        .then((res) => console.log(res))
    }
    
    
    return (
            <div>
                <div className="login">
                    <h1>ログイン</h1>
                </div>
                <div className="signin_button">
                    <img src="../btn_google_signin.png" onClick={()=>signInWithGoogle()} alt="google signin"/>
                </div>
            </div>
        );
}
