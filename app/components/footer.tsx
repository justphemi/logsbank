import { MessageSquareText } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-blue-500 mb-4">LOGSBANK.</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your No. 1 Social Media Logs Vendor for your Facebook, Instagram, Tiktok, LinkedIn, Google Voice, Talkatone, Textplus, Whatsapp, and Twitter logins. 
            </p>
            <p className="text-sm text-muted-foreground mb-4">Please note that we do not encourage any fraudulent activities.</p>
            <div className="flex items-center flex-row">
              <a href="https:wa.me//+23480" target="_blank" className="flex items-center gap-3 flex-row text-green-200">
                <MessageSquareText className="text-green-500" />
                Send us a DM on Whatsapp
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear() + 1} LOGSBANK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

