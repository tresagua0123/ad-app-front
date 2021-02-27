import React from 'react';
import firebase from 'firebase/app';

export const Auth: React.FC = () => {

    const signInWithGoogle = () => {
        // Googleプロバイダオブジェクトのインスタンスを作成
        const provider = new firebase.auth.GoogleAuthProvider()
        // ポップアップウィンドウでログインを行う場合はsignInWithPopupを呼び出す
        firebase.auth().signInWithPopup(provider)
        .then(user => {
            if(user.user) alert("success : " + user.user.displayName + "さんでログインしました");
          })
          .catch(error => {
              alert(error.message);
          });
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
