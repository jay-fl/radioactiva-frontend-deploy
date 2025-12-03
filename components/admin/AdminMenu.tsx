"use client"

import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { User } from '@/src/schemas'
import { logoutAction } from '@/app/actions/login-action'

// Importamos íconos Remix
import {
  //RiUser3Fill,
  RiRadioFill,
  RiNewspaperFill,
  RiMusic2Fill,
  RiGroupFill,
  RiSettings3Fill,
  RiLogoutBoxRFill,
} from "react-icons/ri"

export default function AdminMenu({ user }: { user: User }) {
  const isAdmin = user.role === 'admin'

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-[#248bcf]">
        <Bars3Icon className="w-8 h-8 text-white " />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-medium leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            <p className="text-center mb-2">Hola: {user.name}</p>

            <PopoverButton
              as={Link}
              href="/admin/profile/settings"
              className="flex items-center gap-2 p-2 hover:text-[#248bcf]"
            >
              <RiSettings3Fill size={18} />
              Mi Perfil
            </PopoverButton>

            <PopoverButton
              as={Link}
              href="/admin/news"
              className="flex items-center gap-2 p-2 hover:text-[#248bcf]"
            >
              <RiNewspaperFill size={18} />
              Mis Noticias
            </PopoverButton>

            {isAdmin && (
              <PopoverButton
                as={Link}
                href="/admin/programs"
                className="flex items-center gap-2 p-2 hover:text-[#248bcf]"
              >
                <RiRadioFill size={18} />
                Mis Programas
              </PopoverButton>
            )}

            {isAdmin && (
              <PopoverButton
                as={Link}
                href="/admin/songs"
                className="flex items-center gap-2 p-2 hover:text-[#248bcf]"
              >
                <RiMusic2Fill size={18} />
                Mis Canciones
              </PopoverButton>
            )}

            {isAdmin && (
              <PopoverButton
                as={Link}
                href="/admin/users"
                className="flex items-center gap-2 p-2 hover:text-[#248bcf]"
              >
                <RiGroupFill size={18} />
                Mis Usuarios
              </PopoverButton>
            )}

            <PopoverButton
              as="button"
              type="button"
              onClick={async () => {
                await logoutAction()
              }}
              className="flex items-center gap-2 w-full text-left p-2 hover:text-[#248bcf]"
            >
              <RiLogoutBoxRFill size={18} />
              Cerrar Sesión
            </PopoverButton>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}
