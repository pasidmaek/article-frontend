'use client'
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { loginService } from "@/config/service/authorize";
import { Link } from "@nextui-org/link";
import { useAuth } from "@/config/context/AuthContext";

export default function Signin() {
  const router = useRouter()
  const { setIsLogin } = useAuth()
  const [loginInfo, setLoginInfo] = useState<UserProps>({
    email: "",
    password: ""
  })

  const handleLogin = async () => {
    const result = await loginService(loginInfo)
    if (result?.success) {
      setIsLogin(true)
      router.push('/')
    } else {
      console.error(result?.message)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-80">
        <h1>Sign In</h1>
        <br />
        <Input type="email" label="Email" onChange={(e) => setLoginInfo((prev) => ({ ...prev, email: e.target.value }))} />
        <br />
        <Input type="password" label="Password" onChange={(e) => setLoginInfo((prev) => ({ ...prev, password: e.target.value }))} />
        <br />
        <p>Don't have account?<Link href="/signup">Sign up</Link></p>
        <Button color="primary" onClick={() => handleLogin()} className="w-full">
          Signin
        </Button>
      </div>
    </div>
  )
}