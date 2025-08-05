import Image from "next/image"

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="flex items-center justify-center">
        <Image
          src="/cloudsdew-logo.jpg"
          alt="CloudsDew Logo"
          width={800}
          height={600}
          className="max-w-full h-auto"
          priority
        />
      </div>
    </div>
  )
}
