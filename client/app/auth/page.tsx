import { Tabs } from "antd";
import { NextPage } from "next";
import { LoginForm } from "../../components/LoginForm";

const AuthPage: NextPage = () => {
    return(
        <main>
            <Tabs 
                items={[
                    {
                        label: 'Войти',
                        key: '1',
                        children: <LoginForm/>
                    },
                    {
                        label: 'Регистрация',
                        key: '2', 
                        children: <h1>Регистрация</h1>
                    }
                ]}
            />
        </main>
    )
}

export default AuthPage