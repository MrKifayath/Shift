import { MainLayout } from '@/components/layout/main-layout'

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Customize your Pomodoro experience and preferences.
          </p>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-center text-muted-foreground">
            Settings interface will be implemented in future tasks.
          </p>
        </div>
      </div>
    </MainLayout>
  )
}