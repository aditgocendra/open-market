import * as React from "react";
import {
  Html,
  Text,
  render,
  Head,
  Body,
  Container,
  Section,
  Button,
  Img,
} from "@react-email/components";

export const verificationEmailTemplate = async ({
  url,
  username,
}: {
  url: string;
  username: string;
}) => {
  return await render(
    <VerificationTemplate
      url={url}
      username={username}
    />
  );
};

function VerificationTemplate({
  url,
  username,
}: {
  url: string;
  username: string;
}) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/images/logo/open-market-logo.png`}
            width='40'
            height='40'
            alt='Open Market'
          />
          <Section>
            <Text style={text}>Hi {username},</Text>
            <Text style={text}>
              Thank you for registering an account with Open Market! Please
              click link below to verify your email address
            </Text>
            <Button
              style={button}
              href={url}>
              Verify Email
            </Button>

            <Text style={text}>Happy Shopping!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#1e293b",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "14px 7px",
};
