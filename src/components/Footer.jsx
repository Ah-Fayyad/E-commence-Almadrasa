import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold">ALMDRASA</span>
            </div>
            <p className="text-gray-300 mb-4">{t("footer.description")}</p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-gray-300 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.quick_links")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-primary">
                  {t("nav.products")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.customer_service")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-primary">
                  {t("footer.help_center")}
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-primary">
                  {t("footer.shipping_info")}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-primary">
                  {t("footer.returns")}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-primary">
                  {t("footer.privacy_policy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contact_info")}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin size={16} className="text-primary" />
                <span className="text-gray-300">الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone size={16} className="text-primary" />
                <span className="text-gray-300">+966 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail size={16} className="text-primary" />
                <span className="text-gray-300">info@almdrasa.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">© 2024 ALMDRASA. {t("footer.rights")}</p>
          <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-300 hover:text-primary text-sm">
              {t("footer.terms")}
            </Link>
            <Link to="/privacy" className="text-gray-300 hover:text-primary text-sm">
              {t("footer.privacy")}
            </Link>
            <Link to="/cookies" className="text-gray-300 hover:text-primary text-sm">
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
