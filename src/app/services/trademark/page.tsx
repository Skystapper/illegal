import Image from 'next/image'
import Link from 'next/link'

export default function TrademarkRegistration() {
  const plans = [
    {
      name: "Basic",
      price: "1999",
      features: [
        "Trademark Application Filing",
        "Free Class Search",
        "Free TM Consultation By expert",
        "Drafting & Filing by TM Expert",
        "Use TM next to your brand",
        "EMI Facility",
        "Call, Chat, Email Support",
        "No hidden charges"
      ]
    },
    {
      name: "Standard",
      price: "4999",
      features: [
        "Trademark Application Filing",
        "Creative Logo Design By dedicated Logo Designer (3 Logo design choices)",
        "Expertise TM Search Report",
        "Free Class Search", 
        "Free Consultation till you get TM Mark",
        "Drafting & Filing by TM Expert",
        "Use TM next to your brand",
        "EMI Facility",
        "Call, Chat, Email Support",
        "No hidden charges"
      ]
    },
    {
      name: "Premium",
      price: "11999",
      isRecommended: true,
      features: [
        "Trademark Application Filing",
        "Expertise TM Search Report",
        "Free Class Search",
        "Free Consultation till you get TM Mark", 
        "Drafting & Filing by TM Expert",
        "Use TM next to your brand",
        "Trademark Objection Reply",
        "Trademark Hearing",
        "EMI Facility",
        "Call, Chat, Email Support",
        "No hidden charges"
      ]
    }
  ]

  const benefits = [
    {
      title: "Exclusive Right",
      description: "The registration of Trademark gives you the exclusive right to use of the registered trademark",
      icon: "/icons/registered.svg"
    },
    {
      title: "Legal Protection", 
      description: "Take legal action against unauthorized use of your trademark",
      icon: "/icons/balance.svg"
    },
    {
      title: "Differentiates Product",
      description: "Helps distinguish your products/services from competitors",
      icon: "/icons/comparison.svg"
    },
    {
      title: "Creation of Asset",
      description: "Registered trademark becomes an intangible asset that can be sold or licensed",
      icon: "/icons/asset-management.svg"
    },
    {
      title: "Global Protection",
      description: "Provides basis for international trademark registration",
      icon: "/icons/planet-earth.svg"
    },
    {
      title: "Build Trust",
      description: "Creates customer loyalty and brand recognition",
      icon: "/icons/handshake.svg" 
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-burgundy-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Trademark Registration Services
          </h1>
          <p className="text-xl mb-8">
            Protect your brand identity with our expert trademark registration services
          </p>
          <Link 
            href="#pricing"
            className="bg-yellow-400 text-black px-8 py-3 rounded-md hover:bg-yellow-500 transition-colors font-semibold"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Benefits of Trademark Registration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white p-8 rounded-lg border ${
                  plan.isRecommended ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-gray-200'
                }`}
              >
                {plan.isRecommended && (
                  <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </span>
                )}
                <h3 className="text-2xl font-bold mt-4">₹{plan.price}</h3>
                <h4 className="text-xl font-semibold mb-6">{plan.name}</h4>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg 
                        className="w-5 h-5 text-green-500 mr-2 mt-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-burgundy-600 text-white py-3 rounded-md hover:bg-burgundy-700 transition-colors">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 