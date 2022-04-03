import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

import { useAuth } from "../../hooks/auth";

import { SignInSocialButton } from "../../components/SignInSocialButton";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { singInWhitGoogle, singInWithApple } = useAuth();

  async function handleSingInWithGoogle() {
    try {
      setIsLoading(true);
      return await singInWhitGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro ao fazer login", "Tente novamente mais tarde");
      setIsLoading(false);
    }
  }

  async function handleSingInWithApple() {
    try {
      setIsLoading(true);
      return await singInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro ao fazer login", "Tente novamente mais tarde");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {"\n"} financas de forma {"\n"} muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSingInWithGoogle}
          />

          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSingInWithApple}
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color="White"
            size="large"
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
