import { SapiHiveCameraPreview } from "@/features/preview/SapiHiveCameraPreview";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CameraPreviewPage({ params }: PageProps) {
  const { locale } = await params;
  return <SapiHiveCameraPreview locale={locale === "ar" ? "ar" : "en"} />;
}
