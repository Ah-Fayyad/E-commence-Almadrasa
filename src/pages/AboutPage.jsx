import { useTranslation } from "react-i18next"
import { Target, Award, Globe, Heart, Shield } from "lucide-react"

const AboutPage = () => {
  const { t } = useTranslation()

  const stats = [
    { number: "10K+", label: "عميل سعيد" },
    { number: "5K+", label: "منتج متنوع" },
    { number: "50+", label: "علامة تجارية" },
    { number: "24/7", label: "دعم العملاء" },
  ]

  const values = [
    {
      icon: Heart,
      title: "شغف العملاء",
      description: "نضع عملاءنا في المقدمة ونسعى لتقديم أفضل تجربة تسوق",
    },
    {
      icon: Shield,
      title: "الجودة والثقة",
      description: "نضمن جودة المنتجات وأصالتها مع ضمان شامل",
    },
    {
      icon: Globe,
      title: "الوصول العالمي",
      description: "نوفر منتجات من أفضل العلامات التجارية العالمية",
    },
    {
      icon: Award,
      title: "التميز في الخدمة",
      description: "نسعى للتميز في كل جانب من جوانب خدماتنا",
    },
  ]

  const team = [
    {
      name: "أحمد محمد",
      role: "المؤسس والرئيس التنفيذي",
      image: "/placeholder.svg?height=300&width=300&text=Ahmed",
      description: "خبرة 15 عام في التجارة الإلكترونية",
    },
    {
      name: "فاطمة أحمد",
      role: "مديرة التسويق",
      image: "/placeholder.svg?height=300&width=300&text=Fatima",
      description: "متخصصة في التسويق الرقمي والعلامات التجارية",
    },
    {
      name: "محمد علي",
      role: "مدير التقنية",
      image: "/placeholder.svg?height=300&width=300&text=Mohammed",
      description: "خبير في تطوير المنصات الإلكترونية",
    },
    {
      name: "نورا سالم",
      role: "مديرة خدمة العملاء",
      image: "/placeholder.svg?height=300&width=300&text=Nora",
      description: "متخصصة في تجربة العملاء والدعم الفني",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">من نحن</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            نحن متجر المدرسة، وجهتك الأولى للتسوق الإلكتروني في المملكة العربية السعودية
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">قصتنا</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                بدأت رحلتنا في عام 2020 برؤية بسيطة: جعل التسوق الإلكتروني أسهل وأكثر متعة للجميع. انطلقنا من فكرة توفير
                منصة موثوقة تجمع أفضل المنتجات من مختلف الفئات في مكان واحد.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                اليوم، نفخر بخدمة آلاف العملاء في جميع أنحاء المملكة، ونقدم مجموعة واسعة من المنتجات عالية الجودة مع
                خدمة عملاء متميزة وتجربة تسوق لا تُنسى.
              </p>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Target className="text-primary" size={24} />
                <span className="font-semibold text-gray-900 dark:text-white">
                  مهمتنا: تقديم أفضل تجربة تسوق إلكتروني
                </span>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600&text=Our+Story"
                alt="قصتنا"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">إنجازاتنا بالأرقام</h2>
            <p className="text-gray-600 dark:text-gray-300">أرقام تعكس ثقة عملائنا وتميز خدماتنا</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">قيمنا</h2>
            <p className="text-gray-600 dark:text-gray-300">المبادئ التي نؤمن بها ونعمل من خلالها</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">فريقنا</h2>
            <p className="text-gray-600 dark:text-gray-300">تعرف على الأشخاص الذين يقفون وراء نجاح المدرسة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">رؤيتنا للمستقبل</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              نسعى لأن نكون المنصة الرائدة للتجارة الإلكترونية في المنطقة، ونطمح لتوسيع خدماتنا لتشمل المزيد من البلدان
              والأسواق، مع الحفاظ على التزامنا بالجودة والتميز في الخدمة.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2025</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">التوسع الإقليمي</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">دخول أسواق جديدة في دول الخليج</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2026</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">الذكاء الاصطناعي</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">تطبيق تقنيات الذكاء الاصطناعي لتحسين التجربة</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2027</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">الاستدامة</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">تحقيق أهداف الاستدامة البيئية</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">انضم إلى رحلتنا</h2>
          <p className="text-xl mb-8 opacity-90">كن جزءاً من قصة نجاح المدرسة واستمتع بتجربة تسوق استثنائية</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              ابدأ التسوق الآن
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
              تواصل معنا
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
