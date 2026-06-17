import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');

// Função recursiva para varrer diretórios e achar imagens
function getImages(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getImages(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.jfif'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

async function convertToWebp() {
  console.log('--- Convertendo imagens para WebP ---');
  const images = getImages(PUBLIC_DIR);
  
  if (images.length === 0) {
    console.log('Nenhuma imagem JPG/PNG encontrada na pasta public/.');
    return;
  }
  
  let convertedCount = 0;
  
  for (const imagePath of images) {
    const ext = path.extname(imagePath);
    const webpPath = imagePath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
    
    let shouldConvert = true;
    
    // Verificar se o WebP já existe e é mais recente que o original
    if (fs.existsSync(webpPath)) {
      const originalStat = fs.statSync(imagePath);
      const webpStat = fs.statSync(webpPath);
      
      if (webpStat.mtimeMs > originalStat.mtimeMs) {
        shouldConvert = false;
      }
    }
    
    if (shouldConvert) {
      const relativeSrc = path.relative(PUBLIC_DIR, imagePath);
      const relativeDest = path.relative(PUBLIC_DIR, webpPath);
      
      try {
        console.log(`Convertendo: ${relativeSrc} -> ${relativeDest}`);
        await sharp(imagePath)
          .webp({ quality: 85 })
          .toFile(webpPath);
        convertedCount++;
      } catch (err) {
        console.error(`Erro ao converter ${relativeSrc}:`, err.message);
      }
    }
  }
  
  console.log(`Conversão concluída. Novas imagens convertidas: ${convertedCount}`);
  console.log('------------------------------------');
}

convertToWebp().catch(err => {
  console.error('Erro geral na conversão para WebP:', err);
  process.exit(1);
});
