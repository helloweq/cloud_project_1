"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [userNm, setUserNm] = useState("");
  const [userId, setUserId] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    setMessage("");

    if (!userNm || !userId || !pwd || !confirmPwd) {
      setMessage("모든 항목을 입력해주세요.");
      return;
    }

    if (pwd !== confirmPwd) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId,
        userNm,
        pwd,
      }),
    });

    const result = await response.json();

    if (result.success) {
      alert("회원가입이 완료되었습니다.");
      router.push("/login");
    } else {
      setMessage(result.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <main className="authPage">
      <section className="authCard">
        <p className="eyebrow">Create Account</p>
        <h1>회원가입</h1>
        <p className="muted">테스트용 사용자 계정을 생성합니다.</p>

        <label>
          이름
          <input
            placeholder="이름"
            value={userNm}
            onChange={(event) => setUserNm(event.target.value)}
          />
        </label>

        <label>
          아이디
          <input
            placeholder="사용할 아이디"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
        </label>

        <label>
          비밀번호
          <input
            type="password"
            placeholder="비밀번호"
            value={pwd}
            onChange={(event) => setPwd(event.target.value)}
          />
        </label>

        <label>
          비밀번호 확인
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPwd}
            onChange={(event) => setConfirmPwd(event.target.value)}
          />
        </label>

        {message && <p className="errorText">{message}</p>}

        <button className="primaryButton" type="button" onClick={handleSignup}>
          가입하기
        </button>

        <p className="helperText">
          이미 계정이 있나요? <Link href="/login">로그인</Link>
        </p>
      </section>
    </main>
  );
}