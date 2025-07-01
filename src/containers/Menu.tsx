import { Dock, DockIcon } from '@/components/magicui/dock'
import { Home, Search, Settings } from 'lucide-react'
import React from 'react'

function Menu() {
  return (
<div className="absolute">
      <Dock iconMagnification={60} iconDistance={100}>
        <DockIcon>
          <Home className="size-full" />
        </DockIcon>
        <DockIcon>
          <Settings className="size-full" />
        </DockIcon>
        <DockIcon>
          <Search className="size-full" />
        </DockIcon>
      </Dock>
      </div>
  )
}

export default Menu
