const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const chickenData = [
  {
    id: "pama-coklat",
    name: "PAMA COKLAT",
    tag: "PAMA",
    description: "Karakter aktif dengan postur tubuh yang ramping dan cepat.",
    footerText: "Perawatan intensif",
    image: "/images/pama-coklat.jpg",
    origin: "Thailand (Pama)",
    weightRange: "2.5 - 2.8 kg",
    age: "8 Bulan",
    characterDetail: "Memiliki akurasi gerakan yang sangat tinggi, lincah, dengan struktur tulang ramping yang mendukung pergerakan cepat dan gesit di area farm alami.",
  },
  {
    id: "mangon-merah-gundul",
    name: "MANGON MERAH GUNDUL",
    tag: "MANGON",
    description: "Penampilan khas dengan warna merah gelap dan bentuk kepala unik.",
    footerText: "Kondisi sehat",
    image: "/images/mangon-merah-gundul.jpg",
    origin: "Myanmar (Mangon)",
    weightRange: "2.9 - 3.3 kg",
    age: "10 Bulan",
    characterDetail: "Memiliki ciri khas kepala gundul alami dengan kulit kepala tebal. Karakter tenang namun memiliki daya tahan fisik yang luar biasa dalam adaptasi cuaca farm.",
  },
  {
    id: "pama-saingon",
    name: "PAMA X SAINGON",
    tag: "SILANGAN",
    description: "Perpaduan postur tinggi dan karakter kuat dari dua garis keturunan.",
    footerText: "Perawatan tamang",
    image: "/images/pama-saingon.jpg",
    origin: "Persilangan Lokal (Hibrida)",
    weightRange: "3.0 - 3.4 kg",
    age: "9 Bulan",
    characterDetail: "Mewarisi postur kokoh dan tulang kuat dari genetika Saingon serta kecepatan respons dari garis keturunan Pama. Menghasilkan karakter fisik yang sangat proporsional.",
  },
  {
    id: "bangkok-blorok-madu",
    name: "BANGKOK BLOROK MADU",
    tag: "BANGKOK",
    description: "Corak blorok madu dengan kombinasi warna putih, coklat, dan hitam.",
    footerText: "Stabil dan elegan",
    image: "/images/bangkok-blorok-madu.jpg",
    origin: "Bangkok Klasik",
    weightRange: "3.1 - 3.5 kg",
    age: "11 Bulan",
    characterDetail: "Corak warna bulu blorok madu yang sangat menawan dengan kombinasi putih, merah kecoklatan, dan kilau hitam. Postur berdiri yang tegap dan berwibawa.",
  },
  {
    id: "ayam-hitam-karakter",
    name: "AYAM HITAM KARAKTER",
    tag: "KOLEKSI KARAKTER",
    description: "Ayam kuat dengan bulu hitam mengkilap dan postur yang kokoh.",
    footerText: "Postur terjaga",
    image: "/images/ayam-hitam-karakter.jpg",
    origin: "Lokal Selektif",
    weightRange: "3.2 - 3.6 kg",
    age: "12 Bulan",
    characterDetail: "Memiliki warna hitam legam mengkilap di seluruh tubuhnya dengan postur dada yang bidang dan kaki kokoh berakar. Sangat tenang di kandang namun memiliki kepekaan refleks yang tajam.",
  },
];

async function main() {
  console.log("Starting seeding...");
  
  // Clean existing data to avoid duplicates on re-run
  await prisma.chickenItem.deleteMany();
  
  for (const item of chickenData) {
    const created = await prisma.chickenItem.create({
      data: item,
    });
    console.log(`Created chicken item: ${created.name} (${created.id})`);
  }
  
  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
