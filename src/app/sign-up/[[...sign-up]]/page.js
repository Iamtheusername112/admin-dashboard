import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create account</h1>
          <p className="text-muted-foreground mt-2">
            Get started with your admin dashboard
          </p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-primary/90',
              card: 'shadow-lg',
            }
          }}
        />
      </div>
    </div>
  )
}
