import { Company, CompanySchema } from '../src/domain/company/Company';
import { DynamoDbCompanyRepository } from '../src/infrastructure/dynamo-db/DynamoDbCompanyRepository';
import { DynamoDbMaterialSupplyRepository } from '../src/infrastructure/dynamo-db/DynamoDbMaterialSupplyRepository';
import { DynamoDbMaterialDemandRepository } from '../src/infrastructure/dynamo-db/DynamoDbMaterialDemandRepository';
import {
  MaterialSupply,
  MaterialSupplySchema,
} from '../src/domain/supply/Supply';
import { MaterialTypeSchema } from '../src/domain/material/Material';
import { subMonths } from 'date-fns';
import { newUuid } from '../src/lib/identity';
import {
  MaterialColorSchema,
  MaterialConditionSchema,
} from '../src/domain/material/Material';
import {
  MaterialDemand,
  MaterialDemandSchema,
} from '../src/domain/demand/Demand';

// staging
const MAIN_TABLE =
  'recycled-plastics-api-staging-MainTable74195DAB-8X8DS39STQG8';

const dynamoDb = new DynamoDbCompanyRepository(MAIN_TABLE);
const companyRepository = new DynamoDbCompanyRepository(MAIN_TABLE);
const supplyRepository = new DynamoDbMaterialSupplyRepository(MAIN_TABLE);
const demandRepository = new DynamoDbMaterialDemandRepository(MAIN_TABLE);

const companies: Company[] = [
  {
    id: '48cb6ca5-ffdc-4078-aa90-b62e5045d418',
    createdDate: new Date().toISOString(),
    name: 'Recycled Plastics',
    website: 'https://recycled-plastics.com',
    industry: 'Plastic Recycling',
    email: 'info@recycledplastics.com',
    address: {
      country: 'US',
      city: 'New York',
      street: '123 Main St',
      zipCode: '10001',
    },
    phone: '+1234567890',
    description:
      'Recycled Plastics is a company that recycles plastic waste into new products.',
    verified: true,
    updatedDate: new Date().toISOString(),
    mainContact: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@recycledplastics.com',
      phone: '+1234567890',
      title: 'CEO',
    },
  },
  {
    id: '650e8400-e29b-41d4-a716-446655440001',
    createdDate: '2023-06-15T08:30:00.000Z',
    name: 'EcoPlastics USA Inc.',
    website: 'https://ecoplastics-usa.com',
    industry: 'Plastic Recycling',
    email: 'info@ecoplasticsusa.com',
    address: {
      country: 'US',
      city: 'Los Angeles',
      street: '456 Oak Ave',
      zipCode: '90001',
    },
    phone: '+1234567890',
    description:
      'EcoPlastics USA Inc. is a company that recycles plastic waste into new products.',
    verified: true,
    updatedDate: new Date().toISOString(),
    mainContact: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@recycledplastics.com',
      phone: '+1234567890',
      title: 'CEO',
    },
  },
];

export const materialDescriptions = [
  'High-quality white material, suitable for food packaging',
  'Durable blue material for industrial applications',
  'Flexible black material for flexible packaging',
  'High-grade gray material, ideal for automotive parts',
  'Bright red material for consumer products',
  'Strong green material for electronic housings',
  'Clear yellow material with UV protection',
  'Thermal resistant brown material for mechanical parts',
  'Flexible purple material for medical applications',
  'Vibrant orange material for beverage containers',
  'Premium silver material for construction applications',
  'Recycled black material for sustainable packaging',
  'Transparent material sheet for display cases',
  'Rigid white foam material for insulation',
  'Soft pink material for medical devices',
  'Metallic gold material for decorative elements',
  'Dark navy material for bottles',
  'Lightweight white expanded material for packaging',
  'Heat-resistant white material for cookware',
  'Flexible clear material for protective covers',
  'Sturdy beige foam material for cushioning',
  'Glossy black material for automotive trim',
  'Matte gray material for storage containers',
  'Translucent blue material for safety equipment',
  'Textured brown recycled material for outdoor furniture',
  'Smooth white material for cutting boards',
  'Elastic green material for seals',
  'Rigid amber material for protective eyewear',
  'Porous white expanded material for filters',
  'Dense black material compound for gaskets',
  'Lustrous silver composite material for signage',
  'Malleable material alloy for electrical components',
  'Corrosion-resistant material for food processing',
  'Lightweight material alloy for aerospace applications',
  'Durable composite material for structural parts',
  'Flexible mat material for reinforcement',
  'Heat-conductive material sheet for heat exchangers',
  'Magnetic material alloy for motor components',
  'Non-stick coating material for cookware surfaces',
  'Biodegradable material for eco-friendly packaging',
  'Flame-retardant red material for safety equipment',
  'UV-stabilized white material for outdoor use',
  'Food-grade clear material for medical containers',
  'Impact-resistant black material for protective cases',
  'Moisture-barrier white material film for packaging',
  'Conductive silver-filled material for electronics',
  'Transparent material for clear tubing',
  'Reinforced composite material for automotive panels',
  'Elastic white material for footwear',
  'High-temperature resistant material for insulation',
];

export const imagesUrls: string[] = [
  'https://rp-public-912943812694.s3.eu-central-1.amazonaws.com/tmp/black.png',
  'https://rp-public-912943812694.s3.eu-central-1.amazonaws.com/tmp/blue.png',
  'https://rp-public-912943812694.s3.eu-central-1.amazonaws.com/tmp/brown.png',
  'https://rp-public-912943812694.s3.eu-central-1.amazonaws.com/tmp/gray.png',
  'https://rp-public-912943812694.s3.eu-central-1.amazonaws.com/tmp/green.png',
  'https://rp-public-912943812694.s3.eu-central-1.amazonaws.com/tmp/mix.png',
  'https://rp-public-912943812694.s3.eu-central-1.amazonaws.com/tmp/red.png',
  'https://rp-public-912943812694.s3.eu-central-1.amazonaws.com/tmp/white.png',
  'https://rp-public-912943812694.s3.eu-central-1.amazonaws.com/tmp/yellow.png',
];

export const datasheetsUrls: string[] = [
  'https://rp-public-912943812694.s3.eu-central-1.amazonaws.com/tmp/PP-0210-13.pdf',
];

export const countries: string[] = ['DE', 'GB', 'FR', 'IT', 'CN', 'ES', 'PL'];

const SUPPLY_MATERIALS_COUNT = 15;
const DEMAND_MATERIALS_COUNT = 15;

export const dates = (): string[] => {
  const now = new Date();

  return [
    now.toISOString(),
    subMonths(now, 1).toISOString(),
    subMonths(now, 2).toISOString(),
    subMonths(now, 3).toISOString(),
    subMonths(now, 4).toISOString(),
    subMonths(now, 5).toISOString(),
  ];
};

/**
 * Returns a random integer between min (inclusive) and max (exclusive)
 */
export const randomInt = (input: { min?: number; max: number }) => {
  const { min = 0, max } = input;
  return Math.floor(Math.random() * (max - min) + min);
};

export const randomElement = <T>(input: T[]): T => {
  if (input.length === 0) throw new Error('Input array is empty');
  return input[randomInt({ max: input.length })];
};

const main = async () => {
  console.log('Generating demo data...');

  console.log('Purging table...');
  await dynamoDb.purgeTable(MAIN_TABLE, 'PK', 'SK');
  console.log(`Table ${MAIN_TABLE} purged`);
  await new Promise((resolve) => setTimeout(resolve, 10000));

  console.log('Creating companies...');

  for (const company of companies) {
    await companyRepository.create(CompanySchema.parse(company));
  }
  console.log(`${companies.length} companies created`);

  // ------------------------------------------------------------------------

  console.log('Creating supply materials...');
  const supplyDates = dates();

  const supplyMaterials: MaterialSupply[] = [];
  for (let i = 0; i < SUPPLY_MATERIALS_COUNT; i++) {
    const type = randomElement(MaterialTypeSchema.options);
    const date = supplyDates[i % supplyDates.length];
    const supplyMaterial = MaterialSupplySchema.parse({
      id: newUuid(`MATERIAL_SUPPLY#${i}`),
      companyId: randomElement(companies).id,
      name: `${type}-${randomInt({ min: 100000, max: 999999 })}`,
      createdDate: date,
      updatedDate: date,
      material: {
        type,
        color: randomElement(MaterialColorSchema.options),
        condition: randomElement(MaterialConditionSchema.options),
        certificateOfAnalysis: true,
      },
      description: randomElement(materialDescriptions),
      price: {
        amount: randomInt({ min: 50000, max: 300000 }),
        currency: 'EUR',
      },
      amount: randomInt({ min: 1000, max: 10000 }),
      location: { country: randomElement(countries) },
      documents: [randomElement(datasheetsUrls)].map((url) => ({
        id: newUuid(),
        contentType: 'application/pdf',
        url: url,
        name: url.split('/').pop() || '',
        createdDate: new Date().toISOString(),
        size: 271000,
      })),
      pictures: [randomElement(imagesUrls)].map((url) => ({
        id: newUuid(),
        contentType: 'image/png',
        url: url,
        name: url.split('/').pop() || '',
        createdDate: new Date().toISOString(),
        size: 271000,
      })),
      verified: true,
    });

    await supplyRepository.create(supplyMaterial);
    supplyMaterials.push(supplyMaterial);
  }
  console.log(`${supplyMaterials.length} supply materials created`);

  // ------------------------------------------------------------------------

  console.log('Creating demand materials...');
  const demandDates = dates();
  const demandMaterials: MaterialDemand[] = [];
  for (let i = 0; i < DEMAND_MATERIALS_COUNT; i++) {
    const type = randomElement(MaterialTypeSchema.options);
    const demandMaterial = MaterialDemandSchema.parse({
      id: newUuid(`MATERIAL_DEMAND#${i}`),
      companyId: randomElement(companies).id,
      name: `${type}-${randomInt({ min: 100000, max: 999999 })}`,
      createdDate: demandDates[i % demandDates.length],
      updatedDate: demandDates[i % demandDates.length],
      material: {
        type,
        color: randomElement(MaterialColorSchema.options),
        condition: randomElement(MaterialConditionSchema.options),
        certificateOfAnalysis: true,
      },
      description: randomElement(materialDescriptions),
      price: {
        amount: randomInt({ min: 50000, max: 300000 }),
        currency: 'EUR',
      },
      amount: randomInt({ min: 1000, max: 10000 }),
      location: { country: randomElement(countries) },
      documents: [randomElement(datasheetsUrls)].map((url) => ({
        id: newUuid(),
        contentType: 'application/pdf',
        url: url,
        name: url.split('/').pop() || '',
        createdDate: new Date().toISOString(),
        size: 271000,
      })),
      verified: true,
    });

    await demandRepository.create(demandMaterial);
    demandMaterials.push(demandMaterial);
  }
  console.log(`${DEMAND_MATERIALS_COUNT} demand materials created`);

  console.log('Demo data generated');
};

// AWS_REGION=eu-central-1 AWS_PROFILE=private pnpm exec tsx packages/core/scripts/generate-demo-data.ts
void main();
