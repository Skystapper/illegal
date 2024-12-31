import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/intellectual.jpg"
            alt="Legal Background"
            width={1900}  // Original image width
            height={896}  // Original image height
            className="object-cover w-full h-full"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="text-white md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            We help when<br />
            You need us
          </h1>
          <p className="text-lg mb-8 text-gray-200 max-w-xl">
            The highly qualified team of Legal, attorneys and consultants will be glad to provide necessary legal assistance.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded hover:bg-gray-100 transition-colors font-medium">
            PURCHASE NOW
          </button>
        </div>

        {/* Right Content - Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg md:w-[400px] w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">!FREE CONSULTATION</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 text-gray-900 py-3 rounded font-medium hover:bg-yellow-500 transition-colors"
            >
              SUBMIT YOUR MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Hero 