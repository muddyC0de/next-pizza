import * as React from "react";

interface PayOrderTemplateProps {
  code: string;
}

export const VerificationUserTemplate: React.FC<PayOrderTemplateProps> = ({
  code,
}) =>
  `
  <div>
    <p>
      Ваш код підтвердження: <h2>${code}</h2>
    </p>
    <p>
      <a href="https://next-pizza-ashen.vercel.app/api/auth/verify?code=${code}">
        Підтвердіть реєстрацію
      </a>
    </p>
  </div>
`;
