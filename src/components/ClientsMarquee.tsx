import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";
import carstensz from "@/assets/clients/carstensz.png";
import bni from "@/assets/clients/bni.png";
import sinarmas from "@/assets/clients/sinarmas.png";
import ibis from "@/assets/clients/ibis.png";
import alamSutera from "@/assets/clients/alam-sutera.png";
import mitraKeluarga from "@/assets/clients/mitra-keluarga.png";
import southgate from "@/assets/clients/southgate.png";
import park5 from "@/assets/clients/park5.png";
import townsquare from "@/assets/clients/townsquare.png";
import hotelTentrem from "@/assets/clients/hotel-tentrem.png";
import grandZuri from "@/assets/clients/grand-zuri.png";
import eastvara from "@/assets/clients/eastvara.png";
import horison from "@/assets/clients/horison.png";
import theMirah from "@/assets/clients/the-mirah.png";
import aeon from "@/assets/clients/aeon.png";
import jhlCollection from "@/assets/clients/jhl-collection.png";
import emc from "@/assets/clients/emc.png";
import itcGroup from "@/assets/clients/itc-group.png";
import greenPramuka from "@/assets/clients/green-pramuka.png";
import lippoGroup from "@/assets/clients/lippo-group.png";
import south78 from "@/assets/clients/south78.png";
import doubletree from "@/assets/clients/doubletree.png";
import grandMercure from "@/assets/clients/grand-mercure.png";
import honda from "@/assets/clients/honda.png";
import mayapada from "@/assets/clients/mayapada.png";
import indyProperti from "@/assets/clients/indy-properti.png";
import lotte from "@/assets/clients/lotte.png";
import omoteSando from "@/assets/clients/omote-sando.png";
import gajahTunggal from "@/assets/clients/gajah-tunggal.png";
import puriIndahMall from "@/assets/clients/puri-indah-mall.png";
import alfaTower from "@/assets/clients/alfa-tower.png";
import hotelNeo from "@/assets/clients/hotel-neo.png";
import mercure from "@/assets/clients/mercure.png";
import veranda from "@/assets/clients/veranda.png";
import ikea from "@/assets/clients/ikea.png";
import akasa from "@/assets/clients/akasa.png";
import hotelSantika from "@/assets/clients/hotel-santika.png";
import paramountLand from "@/assets/clients/paramount-land.png";
import emersia from "@/assets/clients/emersia.png";
import fourPoints from "@/assets/clients/four-points.png";
import rsuBunda from "@/assets/clients/rsu-bunda.png";
import summarecon from "@/assets/clients/summarecon.png";
import waskita from "@/assets/clients/waskita.png";
import rskdDurenSawit from "@/assets/clients/rskd-duren-sawit.png";
import cilegonCenter from "@/assets/clients/cilegon-center.png";
import tauzia from "@/assets/clients/tauzia.png";
import permataBank from "@/assets/clients/permata-bank.png";
import rsPondokIndah from "@/assets/clients/rs-pondok-indah.png";

export const clients = [
  { name: "Carstensz", logo: carstensz },
  { name: "BNI", logo: bni },
  { name: "Sinarmas", logo: sinarmas },
  { name: "Ibis Hotels", logo: ibis },
  { name: "Alam Sutera", logo: alamSutera },
  { name: "Mitra Keluarga", logo: mitraKeluarga },
  { name: "Southgate", logo: southgate },
  { name: "Park 5", logo: park5 },
  { name: "Townsquare Cilandak", logo: townsquare },
  { name: "Hotel Tentrem", logo: hotelTentrem },
  { name: "Grand Zuri Hotels", logo: grandZuri },
  { name: "Eastvara", logo: eastvara },
  { name: "Horison Hotels Group", logo: horison },
  { name: "The Mirah Bogor", logo: theMirah },
  { name: "AEON", logo: aeon },
  { name: "JHL Collection", logo: jhlCollection },
  { name: "EMC Healthcare", logo: emc },
  { name: "ITC Group", logo: itcGroup },
  { name: "Green Pramuka City", logo: greenPramuka },
  { name: "Lippo Group", logo: lippoGroup },
  { name: "South78", logo: south78 },
  { name: "DoubleTree by Hilton", logo: doubletree },
  { name: "Grand Mercure Hotels & Resorts", logo: grandMercure },
  { name: "PT Honda Prospect Motor", logo: honda },
  { name: "Mayapada Hospital", logo: mayapada },
  { name: "Indy Properti Indonesia", logo: indyProperti },
  { name: "Lotte", logo: lotte },
  { name: "Omote Sando", logo: omoteSando },
  { name: "PT Gajah Tunggal Tbk", logo: gajahTunggal },
  { name: "Puri Indah Mall", logo: puriIndahMall },
  { name: "Alfa Tower", logo: alfaTower },
  { name: "Hotel Neo", logo: hotelNeo },
  { name: "Mercure Hotels", logo: mercure },
  { name: "Veranda", logo: veranda },
  { name: "IKEA", logo: ikea },
  { name: "Akasa Pure Living", logo: akasa },
  { name: "Hotel Santika", logo: hotelSantika },
  { name: "Paramount Land", logo: paramountLand },
  { name: "Emersia Hotel & Resort", logo: emersia },
  { name: "Four Points by Sheraton", logo: fourPoints },
  { name: "RSU Bunda Margonda", logo: rsuBunda },
  { name: "Summarecon", logo: summarecon },
  { name: "Waskita", logo: waskita },
  { name: "RSKD Duren Sawit", logo: rskdDurenSawit },
  { name: "Cilegon Center", logo: cilegonCenter },
  { name: "Tauzia Hotels", logo: tauzia },
  { name: "Permata Bank", logo: permataBank },
  { name: "RS Pondok Indah Group", logo: rsPondokIndah },
];

const SPEED = 50; // px per second

type Client = { name: string; logo: string };

const MarqueeRow = ({
  items,
  direction = 1,
  isPaused,
}: {
  items: Client[];
  direction?: 1 | -1;
  isPaused: boolean;
}) => {
  const doubled = [...items, ...items];
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useAnimationFrame((_, delta) => {
    if (isPaused || isDraggingRef.current || !trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    if (halfWidth === 0) return;
    let next = x.get() - (direction * SPEED * delta) / 1000;
    if (next <= -halfWidth) next += halfWidth;
    if (next > 0) next -= halfWidth;
    x.set(next);
  });

  return (
    <motion.div
      ref={trackRef}
      className="flex gap-12 w-max py-4 select-none"
      style={{ x }}
      drag="x"
      dragConstraints={{ left: -10000, right: 10000 }}
      dragElastic={0}
      dragMomentum={true}
      onDragStart={() => {
        isDraggingRef.current = true;
      }}
      onDragEnd={() => {
        isDraggingRef.current = false;
        if (trackRef.current) {
          const halfWidth = trackRef.current.scrollWidth / 2;
          let v = x.get() % halfWidth;
          if (v > 0) v -= halfWidth;
          x.set(v);
        }
      }}
    >
      {doubled.map((c, i) => (
        <div
          key={`${c.name}-${i}`}
          className="flex items-center justify-center h-20 w-40 bg-card rounded-xl border border-border px-5 shadow-sm hover:shadow-card-hover transition-all grayscale hover:grayscale-0 pointer-events-auto"
        >
          <img
            src={c.logo}
            alt={`Logo ${c.name}`}
            className="max-h-12 max-w-full object-contain pointer-events-none"
            draggable={false}
            loading="lazy"
          />
        </div>
      ))}
    </motion.div>
  );
};

const ClientsMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const mid = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, mid);
  const row2 = clients.slice(mid);

  return (
    <div className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">
          Klien Kami
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
          Dipercaya oleh Brand Terkemuka
        </h3>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
          Bergabung bersama ratusan klien dari sektor properti, perbankan, hospitality, kesehatan, dan industri.
        </p>
      </motion.div>

      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing space-y-2"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <MarqueeRow items={row1} direction={1} isPaused={isPaused} />
        <MarqueeRow items={row2} direction={-1} isPaused={isPaused} />
      </div>
    </div>
  );
};

export default ClientsMarquee;
