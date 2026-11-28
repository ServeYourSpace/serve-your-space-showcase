// Textes légaux (CGU + politique de confidentialité), exigés par Google Play et l'App Store.
// Mise à jour : penser à changer UPDATED et à relire avec un juriste avant le lancement.
export const LEGAL_UPDATED = '2026-11-22';
export const LEGAL_CONTACT = 'serveyourspace@gmail.com';

export const LEGAL = {
  fr: {
    updated: 'Dernière mise à jour',
    contact: 'Contact',
    privacy: {
      title: 'Politique de confidentialité',
      intro:
        "Cette politique explique quelles données ServeYourSpace collecte dans ses applications client et prestataire, pourquoi, avec qui elles sont partagées et comment exercer vos droits, conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.",
      sections: [
        {
          h: 'Données collectées',
          items: [
            'Compte : nom, prénom, adresse e-mail, téléphone, ville, genre, date de naissance, photo de profil, mot de passe (stocké chiffré, jamais lisible).',
            "Prestataires : photos recto/verso et numéro de la carte nationale (CIN) pour vérifier l'identité, services proposés, solde prépayé et historique de ses mouvements.",
            'Missions : demandes, offres de prix, statut et suivi (en route, arrivé, terminé), annulations et leur motif.',
            'Messages échangés entre client et prestataire dans le cadre d’une mission.',
            "Localisation : position approximative ou précise, seulement si vous l'autorisez, pour trouver des prestataires proches et suivre une mission.",
            "Données techniques : statut en ligne, date de dernière connexion, jeton de notification de l'appareil.",
          ],
        },
        {
          h: 'Pourquoi nous les utilisons',
          items: [
            'Créer et sécuriser votre compte (vérification de l’e-mail par code, connexion, mot de passe oublié).',
            'Mettre en relation clients et prestataires, permettre la négociation, le suivi et la discussion pendant la mission.',
            "Vérifier l'identité des prestataires (lecture automatique de la CIN) pour la sécurité des clients.",
            'Gérer le solde des prestataires et la commission de la plateforme.',
            'Envoyer les notifications liées à vos missions.',
            'Prévenir la fraude et les abus (limitation des tentatives, suspension de comptes).',
          ],
        },
        {
          h: 'Avec qui elles sont partagées',
          items: [
            "L'autre partie d'une mission : le client voit le nom, la photo et la note du prestataire ; le prestataire voit le nom, la photo et l'adresse de la mission du client.",
            "Google (Gmail) pour l'envoi des e-mails de code et de mot de passe provisoire.",
            "Google (Gemini) pour la lecture automatique de la CIN des prestataires ; l'image n'est utilisée que pour cette lecture.",
            "Notre hébergeur, qui stocke les données pour notre compte.",
            'Les autorités, uniquement si la loi nous y oblige.',
            'Nous ne vendons jamais vos données et ne les utilisons pas pour de la publicité.',
          ],
        },
        {
          h: 'Durée de conservation',
          items: [
            'Tant que votre compte est actif.',
            "Quand vous supprimez votre compte (Paramètres > Supprimer mon compte), vos nom, e-mail, téléphone, photo, CIN et mot de passe sont effacés immédiatement. L'historique des missions et des paiements est conservé sous forme anonyme pour la comptabilité et la résolution des litiges.",
            'Les codes de vérification expirent après quelques minutes.',
          ],
        },
        {
          h: 'Sécurité',
          items: [
            'Connexions protégées par un jeton signé, mots de passe chiffrés, accès au solde et aux conversations réservé aux personnes concernées.',
            'Nombre de tentatives de connexion et d’envoi de codes limité.',
          ],
        },
        {
          h: 'Vos droits',
          items: [
            "Vous pouvez accéder à vos données, les corriger (depuis l'application ou en nous écrivant), vous opposer à leur traitement ou supprimer votre compte à tout moment depuis l'application.",
            'Pour toute demande : serveyourspace@gmail.com. Nous répondons sous 30 jours.',
            "Vous pouvez aussi saisir la CNDP (Commission nationale de contrôle de la protection des données à caractère personnel, www.cndp.ma).",
          ],
        },
        {
          h: 'Mineurs',
          items: ["ServeYourSpace est réservé aux personnes de 18 ans et plus."],
        },
      ],
    },
    terms: {
      title: "Conditions générales d'utilisation",
      intro:
        "En créant un compte ServeYourSpace, vous acceptez les présentes conditions. ServeYourSpace est une plateforme qui met en relation des clients avec des prestataires de services à domicile ; elle n'exécute pas elle-même les prestations.",
      sections: [
        {
          h: 'Compte',
          items: [
            'Vous devez avoir 18 ans ou plus et fournir des informations exactes.',
            'Vous êtes responsable de la confidentialité de votre mot de passe et de toute activité sur votre compte.',
            'Vous pouvez supprimer votre compte à tout moment depuis les paramètres de l’application.',
          ],
        },
        {
          h: 'Fonctionnement',
          items: [
            'Le client publie une demande ; les prestataires disponibles peuvent proposer un prix ; la mission commence quand les deux parties acceptent un prix.',
            "Le prix convenu est payé directement par le client au prestataire, à la fin de la prestation.",
            'Une demande non acceptée est annulée automatiquement après un délai.',
          ],
        },
        {
          h: 'Prestataires',
          items: [
            "Le prestataire fournit une carte nationale valide ; son compte peut être limité tant que l'identité n'est pas vérifiée.",
            "Le prestataire alimente un solde prépayé. Quand une mission est acceptée, la commission de la plateforme (20 % du prix convenu) est débitée de ce solde. Un solde insuffisant empêche d'accepter de nouvelles missions.",
            "Le prestataire est seul responsable de la qualité de son travail, de son matériel, de ses assurances et de ses obligations fiscales.",
          ],
        },
        {
          h: 'Annulation',
          items: [
            "Chaque partie peut annuler une mission en indiquant un motif ; l'autre partie est prévenue immédiatement.",
            'Des annulations répétées ou tardives peuvent entraîner une suspension du compte.',
          ],
        },
        {
          h: 'Comportement interdit',
          items: [
            'Fausse identité, contenus injurieux ou illégaux, harcèlement, contournement de la commission, tentative de piratage.',
            'ServeYourSpace peut suspendre ou fermer un compte qui ne respecte pas ces règles.',
          ],
        },
        {
          h: 'Responsabilité',
          items: [
            "ServeYourSpace fournit l'outil de mise en relation et fait ses meilleurs efforts pour qu'il fonctionne, sans garantie d'absence d'interruption.",
            "Le contrat de prestation est conclu entre le client et le prestataire ; ServeYourSpace n'est pas partie à ce contrat et n'est pas responsable de son exécution, sauf faute de sa part.",
          ],
        },
        {
          h: 'Modifications et droit applicable',
          items: [
            'Ces conditions peuvent évoluer ; la date de mise à jour figure en haut de la page.',
            'Elles sont soumises au droit marocain.',
          ],
        },
      ],
    },
  },
  en: {
    updated: 'Last updated',
    contact: 'Contact',
    privacy: {
      title: 'Privacy policy',
      intro:
        'This policy explains what data ServeYourSpace collects in its client and provider apps, why, who it is shared with and how to exercise your rights, in line with Moroccan law 09-08 on the protection of personal data.',
      sections: [
        { h: 'Data we collect', items: [
          'Account: first and last name, email, phone, city, gender, date of birth, profile photo, password (stored encrypted, never readable).',
          'Providers: front/back photos and number of the national ID card (CIN) to verify identity, services offered, prepaid balance and its history.',
          'Missions: requests, price offers, status and tracking (on the way, arrived, done), cancellations and their reason.',
          'Messages exchanged between client and provider during a mission.',
          'Location: approximate or precise, only if you allow it, to find nearby providers and track a mission.',
          'Technical data: online status, last seen date, device notification token.',
        ] },
        { h: 'Why we use it', items: [
          'Create and secure your account (email code, sign-in, forgotten password).',
          'Connect clients and providers, and allow negotiation, tracking and chat during a mission.',
          'Verify providers’ identity (automatic ID card reading) for clients’ safety.',
          'Manage provider balances and the platform commission.',
          'Send notifications about your missions.',
          'Prevent fraud and abuse (attempt limits, account suspension).',
        ] },
        { h: 'Who we share it with', items: [
          'The other party of a mission: the client sees the provider’s name, photo and rating; the provider sees the client’s name, photo and mission address.',
          'Google (Gmail) to send verification and temporary password emails.',
          'Google (Gemini) to read providers’ ID cards automatically; the image is used only for that reading.',
          'Our hosting provider, which stores data on our behalf.',
          'Authorities, only when the law requires it.',
          'We never sell your data or use it for advertising.',
        ] },
        { h: 'How long we keep it', items: [
          'As long as your account is active.',
          'When you delete your account (Settings > Delete my account), your name, email, phone, photo, ID card and password are erased immediately. Mission and payment history is kept anonymously for accounting and disputes.',
          'Verification codes expire after a few minutes.',
        ] },
        { h: 'Security', items: [
          'Signed sign-in tokens, encrypted passwords, balance and conversations visible only to the people concerned.',
          'Limited sign-in and code attempts.',
        ] },
        { h: 'Your rights', items: [
          'You can access and correct your data (in the app or by email), object to its processing, or delete your account at any time from the app.',
          'For any request: serveyourspace@gmail.com. We reply within 30 days.',
          'You can also contact the CNDP (www.cndp.ma).',
        ] },
        { h: 'Minors', items: ['ServeYourSpace is for people aged 18 and over.'] },
      ],
    },
    terms: {
      title: 'Terms of use',
      intro:
        'By creating a ServeYourSpace account you accept these terms. ServeYourSpace is a platform that connects clients with home service providers; it does not perform the services itself.',
      sections: [
        { h: 'Account', items: [
          'You must be 18 or older and provide accurate information.',
          'You are responsible for keeping your password secret and for all activity on your account.',
          'You can delete your account at any time from the app settings.',
        ] },
        { h: 'How it works', items: [
          'The client posts a request; available providers can offer a price; the mission starts when both accept a price.',
          'The agreed price is paid by the client directly to the provider at the end of the service.',
          'A request nobody accepts is cancelled automatically after a while.',
        ] },
        { h: 'Providers', items: [
          'Providers supply a valid national ID card; the account may be limited until identity is verified.',
          'Providers top up a prepaid balance. When a mission is accepted, the platform commission (20% of the agreed price) is debited from it. An insufficient balance prevents accepting new missions.',
          'Providers are solely responsible for the quality of their work, their equipment, insurance and taxes.',
        ] },
        { h: 'Cancellation', items: [
          'Either party can cancel a mission with a reason; the other party is notified immediately.',
          'Repeated or late cancellations may lead to suspension.',
        ] },
        { h: 'Prohibited behaviour', items: [
          'False identity, abusive or illegal content, harassment, bypassing the commission, hacking attempts.',
          'ServeYourSpace may suspend or close accounts that break these rules.',
        ] },
        { h: 'Liability', items: [
          'ServeYourSpace provides the matching tool and makes its best efforts to keep it running, without guarantee of uninterrupted service.',
          'The service contract is between client and provider; ServeYourSpace is not a party to it and is not liable for its performance, except for its own fault.',
        ] },
        { h: 'Changes and governing law', items: [
          'These terms may change; the update date is shown at the top of the page.',
          'They are governed by Moroccan law.',
        ] },
      ],
    },
  },
  ar: {
    updated: 'آخر تحديث',
    contact: 'اتصل بنا',
    privacy: {
      title: 'سياسة الخصوصية',
      intro:
        'توضح هذه السياسة البيانات التي يجمعها ServeYourSpace في تطبيقي الزبون ومقدم الخدمة، وسبب جمعها، ومع من تتم مشاركتها، وكيفية ممارسة حقوقك، وفقاً للقانون المغربي رقم 09-08 المتعلق بحماية المعطيات الشخصية.',
      sections: [
        { h: 'البيانات التي نجمعها', items: [
          'الحساب: الاسم، البريد الإلكتروني، الهاتف، المدينة، الجنس، تاريخ الميلاد، صورة الحساب، كلمة المرور (مشفرة ولا يمكن قراءتها).',
          'مقدمو الخدمة: صور ورقم البطاقة الوطنية للتحقق من الهوية، الخدمات المقدمة، الرصيد المسبق وسجله.',
          'المهام: الطلبات، عروض الأسعار، الحالة والتتبع، الإلغاءات وسببها.',
          'الرسائل المتبادلة بين الزبون ومقدم الخدمة أثناء المهمة.',
          'الموقع: فقط إذا سمحت بذلك، للعثور على مقدمي خدمة قريبين وتتبع المهمة.',
          'بيانات تقنية: حالة الاتصال، آخر ظهور، رمز الإشعارات.',
        ] },
        { h: 'لماذا نستخدمها', items: [
          'إنشاء حسابك وتأمينه.',
          'الربط بين الزبائن ومقدمي الخدمة، والتفاوض والتتبع والمحادثة أثناء المهمة.',
          'التحقق من هوية مقدمي الخدمة لسلامة الزبائن.',
          'إدارة رصيد مقدمي الخدمة وعمولة المنصة.',
          'إرسال الإشعارات المتعلقة بمهامك.',
          'منع الاحتيال وإساءة الاستخدام.',
        ] },
        { h: 'مع من نشاركها', items: [
          'الطرف الآخر في المهمة فقط بما يلزم لإنجازها.',
          'Google (Gmail) لإرسال رسائل التحقق، وGoogle (Gemini) لقراءة البطاقة الوطنية آلياً.',
          'مزود الاستضافة الذي يخزن البيانات لحسابنا.',
          'السلطات فقط إذا فرض القانون ذلك.',
          'لا نبيع بياناتك أبداً ولا نستخدمها للإعلانات.',
        ] },
        { h: 'مدة الاحتفاظ', items: [
          'طالما حسابك نشط.',
          'عند حذف حسابك من الإعدادات، تُمسح بياناتك الشخصية فوراً، ويُحتفظ بسجل المهام والمدفوعات بشكل مجهول الهوية.',
        ] },
        { h: 'حقوقك', items: [
          'يمكنك الاطلاع على بياناتك وتصحيحها والاعتراض على معالجتها أو حذف حسابك في أي وقت من التطبيق.',
          'لأي طلب: serveyourspace@gmail.com. نرد خلال 30 يوماً. ويمكنك أيضاً اللجوء إلى اللجنة الوطنية لمراقبة حماية المعطيات الشخصية (www.cndp.ma).',
        ] },
        { h: 'القاصرون', items: ['ServeYourSpace مخصص للأشخاص البالغين 18 سنة فما فوق.'] },
      ],
    },
    terms: {
      title: 'شروط الاستخدام',
      intro:
        'بإنشاء حساب على ServeYourSpace فإنك تقبل هذه الشروط. ServeYourSpace منصة تربط الزبائن بمقدمي الخدمات المنزلية ولا تنجز الخدمات بنفسها.',
      sections: [
        { h: 'الحساب', items: [
          'يجب أن يكون عمرك 18 سنة فما فوق وأن تقدم معلومات صحيحة.',
          'أنت مسؤول عن سرية كلمة المرور وعن كل نشاط في حسابك.',
          'يمكنك حذف حسابك في أي وقت من إعدادات التطبيق.',
        ] },
        { h: 'طريقة العمل', items: [
          'ينشر الزبون طلباً، ويقترح مقدمو الخدمة سعراً، وتبدأ المهمة عند قبول الطرفين للسعر.',
          'يدفع الزبون السعر المتفق عليه مباشرة لمقدم الخدمة في نهاية الخدمة.',
        ] },
        { h: 'مقدمو الخدمة', items: [
          'يقدم مقدم الخدمة بطاقة وطنية صالحة.',
          'يشحن مقدم الخدمة رصيداً مسبقاً، وتُخصم منه عمولة المنصة (20٪ من السعر المتفق عليه) عند قبول المهمة.',
          'مقدم الخدمة وحده مسؤول عن جودة عمله ومعداته وتأمينه وضرائبه.',
        ] },
        { h: 'الإلغاء والسلوك', items: [
          'يمكن لكل طرف إلغاء المهمة مع ذكر السبب، ويُبلَّغ الطرف الآخر فوراً.',
          'يُمنع انتحال الهوية والمحتوى المسيء والتحايل على العمولة، ويمكن تعليق الحسابات المخالفة.',
        ] },
        { h: 'المسؤولية والقانون', items: [
          'عقد الخدمة يُبرم بين الزبون ومقدم الخدمة، وServeYourSpace ليس طرفاً فيه.',
          'تخضع هذه الشروط للقانون المغربي.',
        ] },
      ],
    },
  },
};
