"use client";
import UserAuthForm from "@/components/user-auth-form";

export default function Page() {
    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
            <div className="flex h-full items-center p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Authentication
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below for authentication.
                        </p>
                    </div>
                    <UserAuthForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        secure, fast, clean.
                    </p>
                </div>
            </div>
        </div>
    );
}
