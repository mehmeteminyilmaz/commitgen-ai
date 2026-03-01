## 🚀 CommitGen AI

CommitGen AI, geliştiricilerin git diff çıktılarını analiz ederek Llama-3 (Groq) altyapısı ile profesyonel, standartlara uygun ve Türkçe commit mesajları üreten bir yapay zeka asistanıdır.

## ✨ Öne Çıkan Özellikler

Akıllı Diff Analizi: Kod değişikliklerini otomatik olarak tarar ve anlamlı özetler çıkarır.

Llama-3 Entegrasyonu: Groq Cloud üzerinden yüksek performanslı ve hızlı yanıt süresi sunar.

Standart Uyumu: feat:, fix:, refactor: gibi endüstri standartlarına (Conventional Commits) uygun mesajlar üretir.

Güvenli Mimari: API anahtarları .env.local dosyası ile izole edilmiştir ve .gitignore ile korunur.

## 🛠️ Teknolojiler
Framework: Next.js (App Router)

Dil: TypeScript

AI Engine: Groq API (Llama-3-70b-versatile)

Styling: Tailwind CSS & Lucide React

## 🚀 Kurulum

1. Bu depoyu klonlayın.
2. `npm install` ile bağımlılıkları yükleyin.
3. Proje ana dizininde bir `.env.local` dosyası oluşturun.
4. Dosyanın içine aşağıdaki satırı ekleyin ve kendi API anahtarınızı yapıştırın:

```env
NEXT_PUBLIC_GROQ_API_KEY=BURAYA_KENDI_ANAHTARINIZI_YAZIN