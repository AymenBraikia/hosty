import { useTranslations } from "next-intl";
import Body from "./body";
import Footer from "./components/footer";
import Header from "./components/header";

export default function Home() {
	const t = useTranslations("Index");
	return (
		<div className="flex flex-col overflow-hidden">
			<Header promotion={{ content: "Don't miss the Cyber week deals", expire_date: 1765902320337 }} />
			<Body />
			<h1>{t("title")}</h1>
			<Footer />
		</div>
	);
}
