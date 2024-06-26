"use client";
import { ChangeEvent, useEffect } from "react";
import { useFormState } from "react-dom";

import { FormCard } from "@components/auth/FormCard";
import { FormMessage } from "@components/FormMessage";
import { FormError } from "@components/FormError";
import { Submit } from "@components/Submit";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

import { signUp } from "@actions/signup";
import { useFormValidate } from "@hooks/useFormValidate";
import { SignUpSchema } from "@schemas/auth";
import { TSignUpFormError } from "@/types/form";

export function SignUpForm() {
  const [state, action] = useFormState(signUp, undefined);
  const { errors, validateField, setErrors } =
    useFormValidate<TSignUpFormError>(SignUpSchema);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    setErrors(state?.errors);
  }, [state, setErrors]);

  return (
    <FormCard
      title="회원가입"
      link={{ label: "이미 계정이 있으신가요?", href: "/login" }}
    >
      <form action={action} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              name="name"
              placeholder="이름을 입력해주세요."
              error={!!errors?.name}
              onChange={handleChange}
            />
            {errors?.name && <FormMessage message={errors.name[0]} />}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              placeholder="example@example.com"
              type="email"
              error={!!errors?.email}
              onChange={handleChange}
            />
            {errors?.email && <FormMessage message={errors.email[0]} />}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              placeholder="******"
              type="password"
              error={!!errors?.password}
              onChange={handleChange}
            />
            {errors?.password && <FormMessage message={errors.password[0]} />}
          </div>
        </div>
        <FormError message={state?.errorMessage} />
        <Submit className="w-full">가입하기</Submit>
      </form>
    </FormCard>
  );
}
