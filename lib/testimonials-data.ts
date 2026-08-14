// Datos de testimonios. Vive en un archivo plano (sin "use client") para
// poder importarse tanto desde componentes cliente (testimonials.tsx)
// como desde Server Components (layout.tsx, para el schema.org JSON-LD)
// sin que Next.js lo convierta en una referencia de cliente opaca.
//
// `text`/`role` son el idioma original (espanol) en el que el cliente
// realmente escribio la reseña. `textEn`/`roleEn` son la traduccion al
// ingles para cuando el sitio esta en ese idioma -- el contenido es el
// mismo, solo cambia el idioma mostrado.

export interface Testimonial {
  id: number
  label: string
  role: string
  roleEn: string
  server: string
  mcUsername: string
  text: string
  textEn: string
}

export const allTestimonials: Testimonial[] = [
  { id: 1, label: 'ヽHoney﹒.', role: 'Owner', roleEn: 'Owner', server: 'ChillMon', mcUsername: 'Grian',
    text: 'Muy buen trabajo, rápido y eficaz, además de precios accesibles @Dark gracias por el trabajo hecho',
    textEn: 'Really good work, fast and efficient, plus affordable prices. @Dark, thanks for the work you did.' },

  { id: 2, label: 'ⁿᵏ𝐕𝐚𝐥𝐞𝐧 ⚝.', role: 'Owner', roleEn: 'Owner', server: 'EnigmaWorld', mcUsername: 'Mumbo',
    text: 'Exelente servicio, muy atento siempre, le compre una config de playerkits le hable y me la cambio sin problemas, hoy le compre el servidor survival porque me parecio exelente y muy amable siempre, totalmente recomendado ',
    textEn: "Excellent service, always attentive. I bought a playerkits config from him, told him what I needed and he changed it without any issues. Today I bought the survival server setup too because he's always excellent and friendly. Totally recommended." },

  { id: 3, label: 'jotkeiz.', role: 'Owner', roleEn: 'Owner', server: 'EclipseCraf', mcUsername: 'iskall85',
    text: 'Excelente trabajo en el servidor de Minecraft y la tienda Tebex Fue muy paciente durante todo el proceso, trabajó de manera rápida y eficiente, y siempre estuvo dispuesto a ayudar ante cualquier duda',
    textEn: 'Excellent work on the Minecraft server and the Tebex store. He was very patient through the whole process, worked fast and efficiently, and was always willing to help with any question.' },

  { id: 4, label: 'Enziuu', role: 'Owner', roleEn: 'Owner', server: 'Astralis MC', mcUsername: 'Xisumavoid',
    text: 'Excelente trabajo el que me realizó,  le pedí una tienda tebex completa y me la hizo tal y como se la pedí,  le doy un 10/10 ,es muy paciente la verdad y dedicado a su trabajo',
    textEn: "Excellent work overall — I asked for a full Tebex store and he built it exactly how I asked. 10/10, he's genuinely patient and dedicated to his work." },

  { id: 5, label: '★彡 TITAN 彡★', role: 'Owner', roleEn: 'Owner', server: 'Beetlejuice', mcUsername: 'ZombieCleo',
    text: 'Excelente servicio que hizo a mi tienda tebex no sería la primera ni la última vez que voy a contratar sus excelentes servicios',
    textEn: "Excellent service on my Tebex store — this won't be the first or last time I hire his excellent services." },

  { id: 6, label: 'JLuis_', role: 'Owner', roleEn: 'Owner', server: 'MineLatin', mcUsername: 'Docm77',
    text: 'Un excelente servicio. La atención al cliente, la disponibilidad y el tiempo de entrega superaron mis expectativas. Solo tenía ideas muy vagas para mi servidor y pensé que sería difícil que las entendiera, pero su trabajo me sorprendió. Si tienen la oportunidad, no duden en contratar sus servicios',
    textEn: "Excellent service. The customer care, availability, and delivery time all exceeded my expectations. I only had vague ideas for my server and thought it'd be hard for him to understand them, but the result surprised me. If you get the chance, don't hesitate to hire him." },

  { id: 7, label: 'Lears_One', role: 'Owner', roleEn: 'Owner', server: 'Pixel Of God', mcUsername: 'Ethoslab',
    text: 'El trabajo y la atencion de @Dark un 10/10  muy buen servicio y  trabajo, estoy esperando tener muchas mas oportunidades de trabajar con usted , es todo lo que se  solicita en una persona con el conocimiento y la capacidad de completar todas las tareas 100%',
    textEn: "@Dark's work and attention: 10/10. Great service and craftsmanship — looking forward to working with him again. Exactly what you want in someone with the knowledge and ability to finish every task 100%." },

  { id: 8, label: 'LeoMendoza', role: 'Owner', roleEn: 'Owner', server: 'Tierra arcana', mcUsername: 'FalseSymmetry',
    text: 'La experiencia con @DARK_NESS fue excelente, la atencion a lo que uno requiere y le solicita, es muy buena, el tiempo igual es muy bueno, te resuelve todas tus dudas , si tienes algun problema de igual manera te resuelve y te ayuda hasta que termina el trabajo ',
    textEn: 'My experience with @DARK_NESS was excellent — he pays real attention to what you ask for, delivery time is great, and he answers every question. If you run into a problem, he sticks with you until it’s solved.' },

  { id: 9, label: 'Pirzi.', role: 'Owner', roleEn: 'Owner', server: 'ArgWorld', mcUsername: 'Rendog',
    text: 'Sinceramente si es buen servicio, mucha ayuda y mas que yo no se hacer nada xd te re agradezco @Dark ',
    textEn: "Honestly, great service — a lot of help, especially since I don't know how to do any of this myself lol. Really grateful, @Dark." },

  { id: 10, label: 'SrBos', role: 'Owner', roleEn: 'Owner', server: 'NexusMC', mcUsername: 'ImpulseSV',
    text: 'Muy buen servicio de @Dark le pedi configuracion de dungeons y minas customs y fue bastante atento a los detalles solicitados, servicio eficiente y sin complicaciones 10/10',
    textEn: 'Great service from @Dark — I asked for custom dungeons and mines, and he paid close attention to every detail I requested. Efficient, no complications. 10/10.' },

  { id: 11, label: 'YisusCm23.', role: 'Owner', roleEn: 'Owner', server: 'SkyCraft', mcUsername: 'Cubfan135',
    text: 'Uffff gracias por el servicio Bro @Dark la verdad muy amable, paciente, la verdad 10/10 Le pedí una configuración completa de mi servidor a como es mi gusto y fue mejor de lo que esperaba. La verdad no me arrepiento de haber pedido sus servicios 🙏🏻',
    textEn: "Ufff, thanks for the service, bro @Dark — genuinely friendly, patient, honestly 10/10. I asked for a full server setup exactly to my taste and it turned out better than I expected. No regrets hiring him. 🙏🏻" },

  { id: 12, label: 'alesinho912', role: 'Owner', roleEn: 'Owner', server: 'KittyCraft', mcUsername: 'Welsknight',
    text: 'Mi experiencia con el servicio de @Dark fue muy buena! le compré un servidor completo me ayudó a configurar y modificar paso a paso las cosas a mi gusto, estuvo a. disposición cada instante. El resultado supero todas mis expectativas, todo quedó de 10... Estoy seguro que voy a seguir necesitando de sus servicios! Super recomendado',
    textEn: "My experience with @Dark's service was great! I bought a full server setup and he helped me configure and tweak everything step by step, exactly how I wanted. He was available the whole time. The result blew past my expectations — everything came out perfect. I'm sure I'll need his services again! Highly recommended." },

  { id: 13, label: 'xFrosedYT⚡', role: 'Owner', roleEn: 'Owner', server: 'LuxorMC', mcUsername: 'WilburSoot',
    text: 'Compre el Servicio de tebex, no fue nada caro, la tienda quedo increíble, es un genio @Dark, super recomendado si tienen pensado comprar su servicio de tebex, o cualquier otro servicio o configuración. 10/10',
    textEn: "I bought the Tebex service, it wasn't expensive at all, and the store turned out incredible. @Dark is a genius. Highly recommended if you're thinking about his Tebex service, or any other service or config. 10/10." },

  { id: 14, label: 'Shinji21', role: 'Owner', roleEn: 'Owner', server: 'GalaxyCraft', mcUsername: 'PearlescentMoon',
    text: 'Mi experiencia con este servicio fue excelente. @Dark  se encargó de crear y configurar mi servidor de Minecraft de manera muy profesional, cuidando cada detalle para que todo quedara funcionando correctamente desde el inicio. El tiempo de espera fue exactamente el estimado, Durante el proceso siempre hubo buena comunicación, resolviendo mis dudas de forma clara y rápida. El resultado final superó mis expectativas: un servidor estable, bien optimizado y listo para disfrutar sin complicaciones.',
    textEn: 'My experience with this service was excellent. @Dark built and configured my Minecraft server very professionally, taking care of every detail so everything worked correctly from the start. The delivery time matched exactly what was estimated. Communication was clear and fast throughout the whole process. The final result exceeded my expectations: a stable, well-optimized server ready to enjoy without any hassle.' },

  { id: 15, label: 'TorreRock', role: 'Owner', roleEn: 'Owner', server: 'MagisCraft', mcUsername: 'Nihachu',
    text: 'Compre un servidor completo a @Dark  y todo perfecto configuración traducción de todos los plugins y un servicio la verdad de 10 me gustó mucho su trato y todo ',
    textEn: 'I bought a complete server from @Dark and everything was perfect — config, translation of every plugin, genuinely a 10/10 service. I really liked how he treated me and everything about it.' },

  { id: 16, label: 'SirExhon❤🇲🇽🔥', role: 'Owner', roleEn: 'Owner', server: 'ImperialCraft', mcUsername: 'Hbomb94',
    text: 'Compre un Servidor con @Dark la configuracion es una perfeccion total, y la verdad fue en tiempo muy corto al realizar la compra la entrega fue casi inmediata y me sorprendió la calidad, sin duda quedo satisfecho con el producto que se me entrego, supero mis espectativas. Seguire adquiriendo sus servicios y productos por la profecionalidad y puntualidad del servicio.',
    textEn: "I bought a server from @Dark, the setup is total perfection, and honestly it was delivered in a really short time — almost immediate after purchase — and the quality surprised me. I'm definitely satisfied with what I got, it exceeded my expectations. I'll keep buying his services and products for how professional and punctual he is." },

  { id: 17, label: '! Strovo', role: 'Owner', roleEn: 'Owner', server: 'hytalebox', mcUsername: 'Skizzleman',
    text: 'Mande hacer las traducciones a @Dark de varios plugin, y la verdad fue en tiempo récord (eran complejas) y me sorprendió la calidad y el tiempo de entrega de todo, estoy seguro que estaré haciendo mas negocios ya que este tipo de trabajos es lo que he estado buscado, gente que  cumpla su palabra y que sea bueno en lo que hace.',
    textEn: "I had @Dark translate several plugins for me, and honestly it was done in record time (they were complex), and the quality and delivery time impressed me. I'm sure I'll be doing more business with him — this is exactly what I've been looking for: people who keep their word and are good at what they do." },

  { id: 18, label: 'DinoBossYT', role: 'Owner', roleEn: 'Owner', server: 'IronMC', mcUsername: 'Vikkstar123',
    text: 'Hola, como siempre intento ser sincero por más que a veces eso pueda ser un dolor para los configurados. En esta ocasión quiero reconocer a @DEMON, quien se comportó como un verdadero profesional. Su trabajo de traducción fue impecable: ordenado, limpio y perfectamente adaptado. Lo más destacable fue su capacidad de resolver los desafíos adicionales que le propuse, los cuales no eran sencillos, y aun así los completó en un tiempo corto y con una calidad sobresaliente. Recomiendo plenamente su servicio; demuestra compromiso, responsabilidad y un nivel de dedicación difícil de encontrar',
    textEn: "Hi, as always I try to be honest even when that's not always comfortable to hear. This time I want to give credit to @DEMON, who acted like a true professional. His translation work was flawless: organized, clean, and perfectly adapted. What stood out most was how he handled the extra challenges I threw at him — they weren't simple, and he still finished them quickly and at an outstanding level of quality. I fully recommend his service; it shows commitment, responsibility, and a level of dedication that's hard to find." },

  { id: 19, label: '𝐒𝐨𝐲𝐒𝐞𝐛𝐚𝐬𝐃𝐌𝐂.', role: 'Owner', roleEn: 'Owner', server: 'AtlasMC', mcUsername: 'BdoubleO100',
    text: 'He pedido un servidor y de manera instantánea, efectivamente se compromete y super chévere la profesionalidad de @Dark 10/10 el trabajo. Se los recomiendo ',
    textEn: "I ordered a server and, right away, he genuinely committed to it — @Dark's professionalism is awesome. 10/10 work. I recommend him." },

  { id: 20, label: 'Azkelaf', role: 'Owner', roleEn: 'Owner', server: 'LatinoCraft', mcUsername: 'VintageBeef',
    text: 'Una vez más he solicitado sus servicios y como siempre sigue siendo un persona profesional y dedicada a su oficio, sin duda alguna lo tendré como mi configurador de cabecera.',
    textEn: "Once again I hired his services, and as always he's professional and dedicated to his craft. No doubt he's going to be my go-to configurator from now on." },

  { id: 21, label: 'LEØ_404.', role: 'Owner', roleEn: 'Owner', server: 'EtheniumMC', mcUsername: 'Fundy',
    text: 'He solicitado varios servicios con ciertas especificaciones y me ha entregado trabajos 10/10 realmente un trabajo elegante, profesional totalmente entregado a su trabajo. Totalmente recomiendo sus servicios ',
    textEn: "I've requested several services with specific requirements, and every time he's delivered 10/10 work — genuinely elegant, professional, and fully committed. I completely recommend his services." },

  { id: 22, label: 'Dionisio', role: 'Owner', roleEn: 'Owner', server: 'Kweeverse', mcUsername: 'Jschlatt',
    text: 'Configuracion rapida, eficaz, profesional y estetica. Trato personalizado segun las necesidades del cliente y buenos precios. Lo volveria a contratar',
    textEn: "Fast, effective, professional, and good-looking config. Personalized service based on what the client actually needs, and fair prices. I'd hire him again." },

  { id: 23, label: 'ryback', role: 'Owner', roleEn: 'Owner', server: 'TempusGod', mcUsername: 'Dream',
    text: 'Aún estamos en el primer paso del proyecto, pero desde ya puedo decir que es un tipazo. Es muy comprensible, paciente y siempre está dispuesto a ayudar. Aunque no tenga todo el conocimiento técnico en cada detalle, se nota que pone bastante empeño en asesorarte bien y en buscar soluciones para que el servidor quede como quieres. Más allá de solo “configurar”, también te orienta, te da ideas y se involucra en el proyecto, lo cual vale bastante cuando estás empezando algo así. Eso genera confianza y hace que el proceso sea mucho más llevadero.🔥 Hasta ahora, muy buena experiencia y totalmente recomendado si buscas a alguien que te apoye y te acompañe en el proceso de crear tu servidor.🎉',
    textEn: "We're still in the first step of the project, but I can already say he's a great guy. Very understanding, patient, and always willing to help. Even when he doesn't have every technical detail memorized, you can tell he puts real effort into advising you well and finding solutions so the server turns out how you want. Beyond just ‘configuring,’ he also guides you, gives you ideas, and gets genuinely involved in the project — which matters a lot when you're just starting out with something like this. It builds trust and makes the whole process a lot easier. 🔥 So far, a great experience and fully recommended if you're looking for someone to support you through building your server. 🎉" },

  { id: 24, label: 'JLuis_', role: 'Owner', roleEn: 'Owner', server: 'LIMP', mcUsername: 'Technoblade',
    text: 'Estoy muy contento con la configuración de mi servidor no tardo en terminar, puso lo que quería como también me aconsejo que cosas podrían mejorar 10/10',
    textEn: 'Really happy with my server setup — he didn’t take long to finish, put in exactly what I wanted, and also advised me on what could be improved. 10/10.' },

  { id: 25, label: 'Shields', role: 'Owner', roleEn: 'Owner', server: 'Bot Discord', mcUsername: 'Tommyinnit',
    text: 'Muy profesional, muy rápido, no sabía ni como quería el diseño y me sorprendió recomendado, hace buenos discord y su bot es good',
    textEn: "Very professional, very fast — I didn't even know what design I wanted and he still surprised me. Recommended, he makes great Discord servers and his bot is good." },

  { id: 26, label: 'Leonar', role: 'Comprador BBB', roleEn: 'BuiltByBit Buyer', server: 'AlonsoTags Config', mcUsername: 'Ranboo',
    text: 'Gran configuracion!! Muy profesional',
    textEn: 'Great config!! Very professional' },

  { id: 27, label: 'Leonar', role: 'Comprador BBB', roleEn: 'BuiltByBit Buyer', server: 'Quests Config', mcUsername: 'GeorgeNotFound',
    text: 'Buena configuracion!! 100% recomendado',
    textEn: 'Good config!! 100% recommended' },

  { id: 28, label: 'boraz6', role: 'Comprador BBB', roleEn: 'BuiltByBit Buyer', server: 'Quests Config', mcUsername: 'Sapnap',
    text: 'muy buena config recomendable buen soporte',
    textEn: 'Really good config, recommended, great support' },

  { id: 29, label: 'sh4ruk3', role: 'Comprador BBB', roleEn: 'BuiltByBit Buyer', server: 'Quests Config', mcUsername: 'Quackity',
    text: 'Excelente config. Indicaciones detalladas para la instalación.',
    textEn: 'Excellent config. Detailed instructions for installing it.' },

  { id: 30, label: 'TrollxTroll', role: 'Comprador BBB', roleEn: 'BuiltByBit Buyer', server: 'Rankup + Kits Config', mcUsername: 'Purpled',
    text: 'La Verdad buena config de rank, Dark excellente persona, te ayuda siempre q lo necesites, tanto este como sus otros complementos valen totalmente la pena :).',
    textEn: "Honestly a great rank config. Dark is an excellent person, always helps when you need it — this add-on and his others are totally worth it :)." },

  { id: 31, label: 'TrollxTroll', role: 'Comprador BBB', roleEn: 'BuiltByBit Buyer', server: 'ProtectionStones Config', mcUsername: 'Skeppy',
    text: 'Muy buena, todo bien traducido y buenos colores.',
    textEn: 'Really good, everything well translated and nice colors.' },

  { id: 32, label: 'xXSk473Xx', role: 'Owner', roleEn: 'Owner', server: 'GRX', mcUsername: 'BadBoyHalo',
    text: 'D4RK un excelente DEV hasta el momento me ha ayudado mucho en mi server, precios justos y su trabajo 10/10, lo que hizo en mi server configuración y añadido de Plugins al 100% también creo y configuró mi página web, el diseño fue 10/10. LO RECOMIENDO ABSOLUTAMENTE',
    textEn: "D4RK is an excellent dev — he's helped me a ton with my server so far, fair prices and 10/10 work. What he did on my server (config and plugin setup) is 100% solid, and he also built and designed my website — 10/10 design. I ABSOLUTELY RECOMMEND HIM." },

  { id: 33, label: 'SoyLuisitoRD', role: 'Owner', roleEn: 'Owner', server: 'StoryWars', mcUsername: 'Antfrost',
    text: 'Quedé muy satisfecho con el trabajo de D4RK. La calidad de las configuraciones, los tiempos de entrega y el diseño superaron mis expectativas. Además, no solo se limita a realizar el servicio, sino que también aporta ideas y recomendaciones para mejorar el servidor, demostrando un gran profesionalismo y compromiso con el proyecto. Sin duda, lo recomiendo al 100%.',
    textEn: "I was really satisfied with D4RK's work. The quality of the configs, the delivery times, and the design all exceeded my expectations. On top of that, he doesn't just do the service — he also brings ideas and recommendations to improve the server, showing real professionalism and commitment to the project. Without a doubt, I recommend him 100%." },

  { id: 34, label: 'Zick', role: 'Owner', roleEn: 'Owner', server: 'StoryWars', mcUsername: 'Philza',
    text: 'D4RK es un excelente DEV. Hasta el momento me ha ayudado muchísimo con mi servidor, siempre ofreciendo precios justos y un trabajo de calidad. Se encargó de configurar y añadir plugins, dejando todo funcionando al 100%. Incluso me ayudó con varios problemas y configuraciones de mi VPS. Es una persona muy responsable, agradable y atenta. Su trabajo es 10/10 y lo recomiendo absolutamente.',
    textEn: "D4RK is an excellent dev. He's helped me a ton with my server so far, always offering fair prices and quality work. He configured and added plugins, leaving everything working 100%. He even helped me with several VPS issues and configs. He's a very responsible, friendly, and attentive person. His work is 10/10 and I absolutely recommend him." },

  { id: 35, label: '𓆩 ziFrostid 𓆪', role: 'Owner', roleEn: 'Owner', server: 'ٴٴ', mcUsername: 'Awesamdude',
    text: 'Me encanta la calidad de como trabaja y lo bien que se adapta según tu presupuesto con precios muy razonables. Además, corrige cualquier error de inmediato. Sin duda, totalmente recomendado.',
    textEn: 'I love the quality of his work and how well he adapts to your budget with very reasonable prices. He also fixes any mistake right away. Without a doubt, fully recommended.' },
]
