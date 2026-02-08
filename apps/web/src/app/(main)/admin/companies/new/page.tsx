import { NewCompanyForm } from '@/features/company/CompanyForm';

export default function NewCompanyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
      <h1 className="text-2xl font-bold mb-6">New company</h1>
      <NewCompanyForm />
    </div>
  );
}
