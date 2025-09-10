import { Tabs } from "antd";
import { NextPage } from "next";
import { LoginForm } from "../../components/LoginForm";
import { RegistrForm } from "../../components/RegistrForm";

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
                        children: <RegistrForm/>
                    }
                ]}
            />
        </main>
    )
}

export default AuthPage