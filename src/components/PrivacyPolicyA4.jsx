import { useState } from 'react';
import { useLanguage } from "../context/LanguageContext";

export default function PrivacyPolicyA4() {
  const [activeSection, setActiveSection] = useState(null);
 const { isArabic } = useLanguage();

   const sectionsAr = [
    {
        id: 'introduction',
        title: 'مقدمة',
        content: `
          <p>نحن في شركة <strong>لُباب للاتصالات وتقنية المعلومات المحدودة</strong> ("الشركة") نلتزم بحماية خصوصية المعلومات الشخصية التي نجمعها أو تتم معالجتها من خلال موقعنا الإلكتروني.</p>
      
          <p>تم إعداد هذه السياسة بما يتوافق مع <strong>نظام حماية البيانات الشخصية (PDPL)</strong> الصادر عن <strong>الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)</strong>، و<strong>هيئة الاتصالات والفضاء والتقنية (CST)</strong>.</p>
      
          <p>تهدف هذه السياسة إلى توضيح كيفية جمع واستخدام وحماية المعلومات الشخصية التي تقدمها لنا عند استخدامك لموقعنا أو خدماتنا، وحقوقك المتعلقة بهذه البيانات.</p>
        `
      },
      {
        id: 'scope',
        title: 'نطاق التطبيق',
        content: `
          <p>تنطبق سياسة الخصوصية هذه على المعلومات الشخصية التي يتم جمعها أو معالجتها من قبل شركة <strong>لُباب</strong>، سواء من خلال موقعها الإلكتروني <a href="https://lubab.sa" class="text-blue-600 underline">lubab.sa</a> أو عبر أي من القنوات الرقمية الأخرى التابعة للشركة.</p>
      
          <p>تشمل هذه السياسة جميع البيانات التي يتم جمعها من المستخدمين عند استخدامهم لخدمات الشركة عبر الإنترنت، بما في ذلك <strong>المواقع الإلكترونية</strong>، أو <strong>التطبيقات</strong>، أو <strong>المنصات الرقمية</strong>، أو <strong>حلول البرمجيات كخدمة (SaaS)</strong> التي تقدمها الشركة.</p>
      
          <p>يرجى ملاحظة أن استخدامك لأي من منصات الشركة الرقمية يعني <strong>موافقتك الضمنية</strong> على بنود هذه السياسة، ما لم يُنص على خلاف ذلك في سياسة خصوصية منفصلة لأي خدمة محددة.</p>
        `
      },
      {
        id: 'use-of-data',
        title: '3. استخدام البيانات الشخصية',
        content: `
          <p>نستخدم البيانات الشخصية التي نجمعها منك للأغراض الموضحة في هذه السياسة، وفي إطار ما تسمح به الأنظمة المعمول بها. الأغراض الرئيسية لاستخدام بياناتك تشمل:</p>
      
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>معالجة طلبات التوظيف:</strong> نستخدم المعلومات المقدمة ضمن طلبات التوظيف لتقييم المتقدمين والتواصل معهم بشأن المقابلات واستكمال إجراءات التوظيف. كما نستخدم بياناتك للرد على استفساراتك ومتابعة حالة طلبك.
            </li>
            <li>
              <strong>التواصل والرد على الاستفسارات:</strong> إذا تواصلت معنا من خلال نموذج الاتصال أو البريد الإلكتروني، نستخدم بيانات الاتصال الخاصة بك ومحتوى الرسالة للرد على استفسارك وخدمتك بشكل فعال.
            </li>
            <li>
              <strong>تحسين الموقع وتجربة المستخدم:</strong> نستخدم بيانات التصفح والمعلومات التي يتم جمعها من خلال ملفات تعريف الارتباط (Cookies) لفهم كيفية استخدام الزوار للموقع. يساعدنا ذلك في تحسين الأداء والمحتوى والوظائف. على سبيل المثال، تساعدنا هذه البيانات في تحديد أكثر الصفحات زيارةً والميزات الأكثر فائدة.
            </li>
            <li>
              <strong>الأغراض القانونية والأمنية:</strong> قد نستخدم بياناتك عند الضرورة للتحقق من الهوية، ومنع الأنشطة غير القانونية (مثل الاحتيال أو محاولات الاختراق)، أو للحفاظ على أمان الموقع وحماية المستخدمين، وذلك بما يتوافق مع القوانين المعمول بها.
            </li>
          </ul>
      
          <p>نؤكد أننا لا نستخدم بياناتك الشخصية لأي أغراض تسويقية أو دعائية، ولا نبيع أو نشارك بياناتك مع جهات خارجية لأغراض تجارية بدون موافقتك الصريحة. يقتصر استخدامنا للبيانات فقط على ما تم جمعه من أجل الأغراض الموضحة في هذه السياسة.</p>
        `
      },
      {
        id: 'cookies',
        title: '4. ملفات تعريف الارتباط (Cookies) والتقنيات المشابهة',
        content: `
          <p>ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة تُحفظ على جهازك عند زيارة موقع إلكتروني. تستخدم شركة <strong>Lubab CIT</strong> ملفات تعريف الارتباط والتقنيات المشابهة لجمع معلومات معينة تلقائيًا بهدف تحسين الخدمات المقدمة لك.</p>
      
          <p>فيما يلي توضيح لكيفية استخدامنا لهذه الملفات:</p>
      
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>أغراض الاستخدام:</strong> نستخدم ملفات تعريف الارتباط لأغراض تحليلية تساعدنا على فهم كيفية تفاعلك مع محتوى الموقع. على سبيل المثال، قد نستخدم خدمات تحليلات الويب مثل <strong>Google Analytics</strong> التي تستخدم ملفات تعريف الارتباط لجمع معلومات حول زيارات الموقع (مثل الصفحات الأكثر زيارة، مدة الزيارة، وكيفية وصول المستخدمين إلى الموقع). تساعدنا هذه البيانات في تحسين تصميم الموقع ومحتواه لتلبية احتياجات الزوار. كما نستخدم بعض ملفات تعريف الارتباط لضمان عمل خصائص الموقع بشكل صحيح وتذكر تفضيلاتك (مثل اختيار اللغة) لتحسين تجربتك في الزيارات المستقبلية.
            </li>
            <li>
              <strong>خيارات المستخدم:</strong> لديك الحق في قبول أو رفض ملفات تعريف الارتباط. يمكنك ضبط إعدادات المتصفح الخاص بك لحظر ملفات تعريف الارتباط أو تنبيهك قبل حفظها. كما يمكنك حذف ملفات تعريف الارتباط من جهازك في أي وقت. لكن يرجى ملاحظة أن تعطيل بعض أنواع ملفات تعريف الارتباط قد يؤثر على بعض وظائف الموقع أو أدائه؛ حيث قد لا تعمل بعض الميزات بشكل صحيح إذا تم تعطيل ملفات تعريف الارتباط الأساسية.
            </li>
            <li>
              <strong>الموافقة:</strong> من خلال الاستمرار في استخدام موقعنا دون تغيير إعدادات المتصفح لرفض ملفات تعريف الارتباط، فإنك توافق ضمنيًا على استخدامنا لها كما هو موضح في هذه السياسة. نحن نقدم إشعارًا واضحًا للمستخدمين عند زيارتهم الأولى بشأن استخدامنا لملفات تعريف الارتباط، ويمكنك اختيار الاستمرار في استخدام الموقع بناءً على تلك الشروط، مما يُعد قبولًا لها.
            </li>
          </ul>
      
          <p>لمزيد من المعلومات حول كيفية استخدامنا لملفات تعريف الارتباط، أو إذا كان لديك أي استفسار متعلق بها، يمكنك التواصل معنا عبر قنوات الاتصال المذكورة في هذه السياسة.</p>
        `
      },
      {
        id: 'data-sharing',
        title: '5. مشاركة البيانات والإفصاح عنها',
        content: `
          <p>نحن نحترم خصوصيتك، ولذلك فإننا لن نشارك بياناتك الشخصية مع أي طرف ثالث إلا في حالات محدودة تقتضيها الضرورة لتقديم خدماتنا أو حسب ما تفرضه القوانين المعمول بها. تشمل هذه الحالات:</p>
      
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>داخل الشركة:</strong> قد نشارك بيانات طلبات التوظيف داخليًا مع الموظفين المعنيين في عملية التوظيف (مثل أفراد فريق الموارد البشرية أو المديرين المعنيين) من أجل مراجعة الطلبات واتخاذ القرارات والتواصل معك. يتم تقييد الوصول إلى هذه البيانات فقط للأشخاص الذين يحتاجون إليها لأداء مهامهم، وذلك وفقًا لهذه السياسة.
            </li>
            <li>
              <strong>مزودو الخدمات الخارجيون:</strong> قد نستعين بأطراف خارجية موثوقة لتقديم خدمات معينة تدعم تشغيل الموقع أو تخزين البيانات ومعالجتها بالنيابة عنا. مثلًا، قد نستخدم خدمات الحوسبة السحابية مثل <strong>Amazon Web Services (AWS)</strong> أو <strong>Google Cloud</strong> لاستضافة البيانات، أو شركات التحليلات لفهم استخدام الموقع. لا يتم تزويد هذه الأطراف إلا بالحد الأدنى من البيانات اللازمة لأداء مهامهم، وهم ملزمون قانونيًا بالحفاظ على سرية البيانات وأمنها، وعدم استخدامها لأي غرض آخر.
            </li>
            <li>
              <strong>الالتزامات القانونية:</strong> في بعض الحالات، قد نكون ملزمين قانونيًا بالإفصاح عن بياناتك الشخصية امتثالًا لأمر قضائي أو طلب رسمي من جهة حكومية أو تنظيمية (مثل المحكمة أو السلطات المختصة). سنتأكد من صحة الطلب ومشروعيته قبل مشاركة أي بيانات، وسنحصر الإفصاح على الحد الأدنى الضروري حسب ما يفرضه القانون.
            </li>
          </ul>
      
          <p>بخلاف ما ذُكر أعلاه، فإننا لا نقوم ببيع أو تأجير أو تبادل بياناتك الشخصية مع أي كيانات تجارية خارجية لأي سبب كان. وإذا أصبح من الضروري مشاركة بياناتك مع طرف خارجي غير مذكور أعلاه، فسنقوم بطلب موافقتك المسبقة، ما لم يكن الإفصاح مطلوبًا بموجب القانون.</p>
        `
      },
      {
        id: 'international-data',
        title: '6. نقل وتخزين البيانات دوليًا',
        content: `
          <p>تقع الشركة في المملكة العربية السعودية، ومع ذلك، قد يتم تخزين أو معالجة بعض البيانات الشخصية خارج المملكة إذا اقتضت الضرورة لضمان تقديم خدماتنا بكفاءة، مثل استخدام خوادم أو مراكز بيانات تابعة لمزودي خدمات عالميين مثل <strong>AWS</strong> أو <strong>Google Cloud</strong>.</p>
      
          <p>في هذا السياق، نلتزم باتخاذ كافة الإجراءات لحماية البيانات المنقولة دوليًا، وفق ما يلي:</p>
      
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>الامتثال للقوانين:</strong> يتم نقل البيانات الشخصية إلى خارج المملكة وفقًا لنظام حماية البيانات الشخصية في السعودية. لن يتم نقل البيانات إلا إلى كيانات أو دول توفر مستوى حماية مماثل، أو بعد اتخاذ تدابير كافية مثل توقيع اتفاقيات حماية بيانات، أو بعد الحصول على موافقتك إذا تطلب القانون ذلك.
            </li>
            <li>
              <strong>أمان النقل والتخزين:</strong> نستمر في تطبيق إجراءات الأمان على البيانات حتى عند نقلها أو تخزينها خارج المملكة. ويتضمن ذلك التأكد من أن مزودي الخدمات الخارجيين يلتزمون بتطبيق معايير أمان صارمة، واستخدام تقنيات تشفير عند نقل البيانات عبر الشبكات.
            </li>
            <li>
              <strong>الموافقة الضمنية:</strong> باستخدامك لهذا الموقع وتقديمك بياناتك الشخصية، فإنك تدرك وتوافق ضمنيًا على أنه قد يتم تخزين بياناتك أو معالجتها على خوادم خارج بلد إقامتك (بما في ذلك خارج المملكة العربية السعودية). وإذا تطلب القانون الحصول على موافقة صريحة، فسنقوم بذلك في حينه.
            </li>
          </ul>
      
          <p>نحن ملتزمون في جميع الأحوال بالحفاظ على خصوصيتك وأمان بياناتك، وسنقوم بإعلامك فورًا في حال حدوث خرق أمني شديد قد يؤثر على بياناتك، وسنتخذ الإجراءات التصحيحية اللازمة.</p>
        `
      },
      {
        id: 'data-protection',
        title: '7. حماية البيانات وأمانها',
        content: `
          <p>نحن نولي أهمية قصوى لأمن بياناتك الشخصية، وقد قمنا بتنفيذ تدابير تقنية وتنظيمية مناسبة لمنع فقدانها أو إساءة استخدامها أو الوصول غير المصرح به إليها أو الكشف عنها.</p>
      
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>التدابير التقنية:</strong> نستخدم تقنيات أمنية حديثة مثل الجدران النارية، وأنظمة كشف التسلل، والتشفير لحماية نقل البيانات. كما يتم تخزين البيانات في قواعد بيانات مؤمنة بإجراءات وصول صارمة تتيح فقط للموظفين المخولين الاطلاع عليها عند الحاجة.
            </li>
            <li>
              <strong>التدابير التنظيمية:</strong> نطبق سياسات داخلية صارمة تضمن التعامل السليم مع البيانات الشخصية. كما يتلقى موظفونا تدريبات دورية على أهمية السرية وأفضل ممارسات الأمان، ولا يُسمح لهم بمشاركة البيانات مع أي طرف غير مخول أو استخدامها بشكل غير قانوني. نقوم أيضًا بمراجعة هذه السياسات والإجراءات بشكل دوري لضمان فعاليتها ومواكبتها للتطورات التقنية.
            </li>
            <li>
              <strong>التعامل مع الحوادث الأمنية:</strong> رغم كل الإجراءات الوقائية، لا يمكن ضمان "أمان مطلق" على الإنترنت. في حال اكتشاف خرق أمني أو ثغرة قد تهدد بياناتك، تتخذ فرقنا المتخصصة إجراءات فورية لاحتواء ومعالجة الحادث، وتحديد أسبابه ومنع تكراره. كما سنقوم بإبلاغ الجهات المختصة (مثل الهيئة السعودية للبيانات والذكاء الاصطناعي أو الهيئة الوطنية للأمن السيبراني) وكذلك إخطارك إذا كنت متأثرًا مباشرةً، لضمان الشفافية وحماية حقوقك.
            </li>
          </ul>
      
          <p>كما نحث المستخدمين على التعاون في حماية بياناتهم، فإذا كان لديك حساب مستخدم للوصول إلى منطقة خاصة في الموقع (مثل بوابة التوظيف)، فأنت مسؤول عن الحفاظ على سرية اسم المستخدم وكلمة المرور الخاصة بك. لا تشارك معلومات الدخول مع أي طرف آخر، وقم بإبلاغنا فورًا إذا اشتبهت في أي استخدام غير مصرح به لحسابك.</p>
        `
      },
      {
        id: 'data-protection',
        title: '7. حماية البيانات وأمانها',
        content: `
          <p>نحن نولي أهمية قصوى لأمن بياناتك الشخصية، وقد قمنا بتنفيذ تدابير تقنية وتنظيمية مناسبة لمنع فقدانها أو إساءة استخدامها أو الوصول غير المصرح به إليها أو الكشف عنها.</p>
      
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>التدابير التقنية:</strong> نستخدم تقنيات أمنية حديثة مثل الجدران النارية، وأنظمة كشف التسلل، والتشفير لحماية نقل البيانات. كما يتم تخزين البيانات في قواعد بيانات مؤمنة بإجراءات وصول صارمة تتيح فقط للموظفين المخولين الاطلاع عليها عند الحاجة.
            </li>
            <li>
              <strong>التدابير التنظيمية:</strong> نطبق سياسات داخلية صارمة تضمن التعامل السليم مع البيانات الشخصية. كما يتلقى موظفونا تدريبات دورية على أهمية السرية وأفضل ممارسات الأمان، ولا يُسمح لهم بمشاركة البيانات مع أي طرف غير مخول أو استخدامها بشكل غير قانوني. نقوم أيضًا بمراجعة هذه السياسات والإجراءات بشكل دوري لضمان فعاليتها ومواكبتها للتطورات التقنية.
            </li>
            <li>
              <strong>التعامل مع الحوادث الأمنية:</strong> رغم كل الإجراءات الوقائية، لا يمكن ضمان "أمان مطلق" على الإنترنت. في حال اكتشاف خرق أمني أو ثغرة قد تهدد بياناتك، تتخذ فرقنا المتخصصة إجراءات فورية لاحتواء ومعالجة الحادث، وتحديد أسبابه ومنع تكراره. كما سنقوم بإبلاغ الجهات المختصة (مثل الهيئة السعودية للبيانات والذكاء الاصطناعي أو الهيئة الوطنية للأمن السيبراني) وكذلك إخطارك إذا كنت متأثرًا مباشرةً، لضمان الشفافية وحماية حقوقك.
            </li>
          </ul>
      
          <p>كما نحث المستخدمين على التعاون في حماية بياناتهم، فإذا كان لديك حساب مستخدم للوصول إلى منطقة خاصة في الموقع (مثل بوابة التوظيف)، فأنت مسؤول عن الحفاظ على سرية اسم المستخدم وكلمة المرور الخاصة بك. لا تشارك معلومات الدخول مع أي طرف آخر، وقم بإبلاغنا فورًا إذا اشتبهت في أي استخدام غير مصرح به لحسابك.</p>
        `
      },
      {
        id: 'child-privacy',
        title: '8. حماية خصوصية الأطفال',
        content: `
          <p>موقعنا وخدماتنا غير موجهة خصيصًا للأطفال (أي الأفراد تحت سن 18 عامًا). نحن لا نقوم بجمع بيانات شخصية من الأطفال دون موافقة ولي الأمر أو الوصي الشرعي.</p>
      
          <p>إذا كنت تحت سن 18 عامًا، يجب الحصول على إذن من ولي أمرك قبل تقديم أي معلومات شخصية عبر الموقع.</p>
      
          <p>إذا تبين لنا أننا قمنا بجمع بيانات شخصية لطفل دون الحصول على الموافقة اللازمة، فسنقوم بحذف تلك البيانات فورًا من سجلاتنا.</p>
      
          <p>إذا كنت ولي أمر وتعتقد أن طفلك قد زودنا بمعلومات شخصية، يرجى التواصل معنا لاتخاذ الإجراءات اللازمة.</p>
        `
      },
      {
        id: 'privacy-liability',
        title: '9. حدود المسؤولية عن الخصوصية',
        content: `
          <p>نحن نلتزم بحماية بياناتك الشخصية بما يتوافق مع أعلى المعايير الأمنية، ومع ذلك، لا يمكن ضمان أمان نقل البيانات عبر الإنترنت بنسبة 100%. لذلك، فإن الشركة لا تضمن بشكل قاطع حماية البيانات أثناء النقل، وتتحمل مسؤوليتها فقط بعد استلام البيانات وتخزينها وفقًا لإجراءات الأمان المعتمدة.</p>
      
          <p>إنك تتحمل مسؤولية الحفاظ على سرية معلومات الدخول الخاصة بك، مثل اسم المستخدم وكلمة المرور، وعدم مشاركتها مع أي طرف ثالث. في حال اكتشاف أي استخدام غير مصرح به لحسابك، يرجى إخطارنا فورًا حتى نتخذ الإجراءات اللازمة.</p>
      
          <p>قد يحتوي موقعنا على روابط إلى مواقع خارجية لا تخضع لسيطرتنا. نحن لا نتحمل أي مسؤولية عن ممارسات الخصوصية أو محتوى تلك المواقع، ونوصي بمراجعة سياسات الخصوصية الخاصة بها عند زيارتها.</p>
        `
      },
      {
        id: 'policy-updates',
        title: '10. التعديلات على سياسة الخصوصية',
        content: `
          <p>قد نقوم بتحديث أو تعديل سياسة الخصوصية هذه من وقت لآخر لتعكس التغيرات في ممارساتنا أو الامتثال للمتطلبات القانونية والتنظيمية. تحتفظ الشركة بالحق في إجراء تلك التعديلات في أي وقت.</p>
      
          <p>عند إجراء أي تعديل، سنقوم بنشر النسخة المحدثة على هذه الصفحة وتحديث تاريخ "آخر تعديل" أدناه. استمرارك في استخدام الموقع بعد نشر أي تغييرات يعتبر موافقة ضمنية على السياسة المعدلة.</p>
      
          <p>في حال كانت التعديلات جوهرية وقد تؤثر بشكل كبير على حقوقك أو التزاماتنا، فقد نحاول إعلامك بها (مثل إرسال إشعار عبر البريد الإلكتروني أو عرض تنبيه بارز على الموقع).</p>
        `
      },
      {
        id: 'contact',
        title: '11. الاتصال بنا',
        content: `
          <p>نرحب بأي استفسارات أو طلبات تتعلق بسياسة الخصوصية هذه أو ببياناتك الشخصية. إذا كانت لديك أي أسئلة حول كيفية استخدام بياناتك، أو رغبت في ممارسة أي من حقوقك، أو تعتقد بوجود خرق لهذه السياسة، يمكنك التواصل معنا عبر:</p>
      
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>البريد الإلكتروني:</strong> <a href="mailto:info@lubab.sa" class="text-blue-600 underline">info@lubab.sa</a></li>
          </ul>
      
          <p>سنبذل قصارى جهدنا للرد على استفسارك أو طلبك في أقرب وقت ممكن. إن خصوصيتك تهمنا، وأي طلب يتعلق بحماية بياناتك الشخصية سيتم التعامل معه بجدية واهتمام.</p>
      
          <p><strong>تاريخ آخر تحديث:</strong> 20 إكس</p>
        `
      }
   ]

  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: 'We at Lubab CIT Ltd. (“the Company”) are committed to protecting the privacy of users of our official website. This policy is prepared in accordance with the laws and regulations in force in the Kingdom of Saudi Arabia, including the Personal Data Protection Law (PDPL) issued by the Saudi Data and Artificial Intelligence Authority (SDAIA), and the regulations of the Communications, Space & Technology Commission (CST). The purpose of this policy is to explain how personal data is collected, used, and protected when you use the Company’s website. Please read the following carefully to understand our practices.'
    },
    {
      id: 'scope',
      title: '2. Scope of Application',
      content: 'This Privacy Policy applies to your use of the Company’s main official website (for example, the website hosted at the domain lubab.sa). It is specific to this site only and does not apply to any other sites or platforms the Company may launch in the future via subdomains or standalone sites (e.g., SaaS service platforms), each of which will have its own privacy policy and terms of use. Your use of this site implies your agreement to the collection and use of your data as described in this policy.'
    },
    {
        id: 'data-collect',
        title: '3. Data We Collect',
        content: `
          <p>We strive to collect only the minimum personal data necessary to fulfill the stated purposes. 
          Generally, our site does not collect any personal data about you unless you voluntarily provide it 
          to us through the site. The circumstances under which we collect personal data include:</p>
          
          <ol class="list-disc pl-6">
            <li>
              <strong>Job Applications:</strong> When applying for a position through the site, we will ask you 
              to provide certain personal information such as your full name and email address, in addition to 
              any information or files you choose to submit in support of your application (e.g., résumé, other 
              relevant attachments).
            </li>
            <li>
              <strong>Contact Form:</strong> If you contact us through any available contact forms on the site, 
              we may request basic contact details (e.g., name, email address, phone number) and your message 
              content so we can assist you and respond to your inquiry.
            </li>
            <li>
              <strong>Technical Information and Cookies:</strong> When you visit our site, we may automatically 
              collect certain non-personal technical information, such as your device’s IP address, browser type 
              and version, browser language, and operating system. Our site also uses cookies and similar 
              technologies to collect information about how you interact with the site, for analytical purposes 
              and to improve your experience. This information includes statistical data about page visits, 
              duration of browsing, and so on, and is not used to identify you personally. Please see the 
              Cookies section below for more details.
            </li>
          </ol>
        `
      },
      {
        id: 'use-data',
        title: '4. Use of Personal Data',
        content: `
          <p>We use the personal data we collect from you for the purposes detailed in this policy and in accordance with applicable laws. The main purposes for using your data include:</p>
      
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>Processing Job Applications:</strong> We use the information submitted in job applications to evaluate candidates and communicate with them regarding interviews and completing the hiring process. Your data will be used to contact you about your application and inform you of its status and any subsequent steps.
            </li>
            <li>
              <strong>Communication and Response to Inquiries:</strong> If you reach out to us via a contact form or email, we will use your contact details and the content of your message to respond to your inquiry or request and serve you effectively.
            </li>
            <li>
              <strong>Improving the Site and User Experience:</strong> We use browsing data and information collected through cookies to understand how visitors use our site, which helps us improve its content, performance, and functionality. For example, this data allows us to identify the most visited pages and which features are most useful, thereby enhancing everyone’s browsing experience.
            </li>
            <li>
              <strong>Legal and Security Purposes:</strong> We may use your data when necessary to verify identity and prevent unlawful activities (such as fraud or hacking attempts) or to maintain the security of the site and protect users, in compliance with relevant laws.
            </li>
          </ul>
      
          <p>We confirm that we do not use your personal data for any marketing or promotional purposes, nor do we sell or share it with external parties for commercial gain without your prior explicit consent. Our use of your data is limited solely to what was collected for the purposes described in this policy.</p>
        `
      },
      {
        id: 'cookies',
        title: '5. Cookies and Similar Technologies',
        content: `
          <p>Cookies are small text files that are stored on your device when you visit a website. Lubab CIT uses cookies and similar technologies to collect certain information automatically to improve the services offered to you. Below is an explanation of how we use these files:</p>
      
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>Purposes of Use:</strong> We use cookies for analytical purposes, helping us understand how you interact with our site’s content. For example, we may employ web analytics services like Google Analytics, which uses cookies to gather information about site visits (e.g., most visited pages, duration of visits, how users arrived at the site). This data helps us refine site design and content to meet visitor needs. Additionally, we may use certain cookies to ensure that features on our site function correctly and to remember your preferences (like language choice) to enhance your experience on future visits.
            </li>
            <li>
              <strong>User Choices:</strong> You have the right to accept or reject cookies. You can configure your browser settings to block cookies or alert you before they are saved. You can also delete cookies from your device at any time. However, please note that disabling certain cookies may affect some of the site’s functionality or performance; some features might not work properly if essential cookies are disabled.
            </li>
            <li>
              <strong>Consent:</strong> By continuing to use our site without changing your browser settings to reject cookies, you are implicitly agreeing to our use of cookies as described in this policy. We provide clear notification to users on their first visit regarding our use of cookies, and you may choose whether to continue using the site under those conditions, which implies acceptance of cookies. For more information on how we use cookies, or if you have any questions related to them, you can contact us via the communication channels mentioned below in this policy.
            </li>
          </ul>
        `
      },
      {
        id: 'data-sharing',
        title: '6. Data Sharing and Disclosure',
        content: `
          <p>We respect the privacy of your data, and therefore we will not share your personal data with any third party except under limited circumstances as required to provide our services or as mandated by the applicable regulations. Such circumstances include:</p>
      
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>Within the Company:</strong> We may share your job application data internally with authorized personnel involved in the hiring process (e.g., HR team members, relevant managers) to review your application, make decisions, and communicate with you. We ensure access to your data is restricted to those who need to view it as part of their duties and in accordance with this policy.
            </li>
            <li>
              <strong>External Service Providers:</strong> We may engage trusted third parties to provide certain services that support the operation of our site or to store and process data on our behalf. For example, we may use hosting providers or cloud services (like Amazon Web Services or Google Cloud) to store data, or analytics companies to analyze site usage. These parties will only receive the data necessary to perform the services requested of them and are obligated to protect that data and not use it for any other purpose, according to contracts that ensure confidentiality, security, and compliance with relevant data protection laws.
            </li>
            <li>
              <strong>Legal Obligations:</strong> In some cases, we may be legally required to disclose your personal data in compliance with a statutory obligation or in response to an official request from a government or judicial authority (e.g., a court order or legal investigation). We will comply with such legal requests to the extent required by law, ensuring we confirm the legitimacy of the request and validate the requester’s identity within legal frameworks.
            </li>
          </ul>
      
          <p>Beyond the above scenarios, we will not sell, rent, or trade any of your personal data to external commercial entities for any reason. If it becomes necessary to share your data with an external party not mentioned above, we will seek your prior consent unless such sharing is mandated by law.</p>
        `
      },
      {
        id: 'international-data',
        title: '7. International Data Transfer and Storage',
        content: `
          <p>Our Company is based in the Kingdom of Saudi Arabia, but certain personal data may be stored or processed outside the Kingdom if needed to ensure efficient operation of our services. For instance, we may rely on servers or cloud data centers operated by global providers like AWS or Google Cloud located in other countries. In this context, we take every measure to comply with relevant data transfer regulations, as follows:</p>
      
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>Legal Compliance:</strong> Any transfer of your personal data outside Saudi Arabia will be carried out in accordance with the Saudi PDPL and related regulations. For example, we will only transfer data to entities or countries that maintain a level of personal data protection similar to that in the Kingdom, or after taking sufficient measures to secure the transferred data (such as signing data protection agreements), or upon obtaining your consent where required by law.
            </li>
            <li>
              <strong>Security of Transfer and Storage:</strong> We continue to apply security measures to protect your data even when it is transferred or stored outside the Kingdom. This includes ensuring that external service providers apply stringent security standards to prevent unauthorized access or breaches. We may also use encryption mechanisms for data transmitted over networks to safeguard it.
            </li>
            <li>
              <strong>Implicit Consent:</strong> By using this site and providing your personal data, you understand and accept that it may be necessary to store or process your data on servers located outside your country of residence (including outside Saudi Arabia). Where explicit legal consent is required for international data transfer, we will obtain that consent when mandated by law; otherwise, by continuing to use the site and submitting your data, you are deemed to have provided implicit consent within the bounds of applicable regulations.
            </li>
          </ul>
      
          <p>In any case, we remain committed to maintaining your data’s privacy and security, wherever it is stored or processed. We will promptly notify you if a severe security breach occurs that may compromise your data, and we will take corrective measures as needed.</p>
        `
      },
      {
        id: 'data-protection',
        title: '8. Data Protection and Security',
        content: `
          <p>We prioritize the security of your personal data, and have implemented appropriate technical and organizational measures to prevent its loss, misuse, or unauthorized access or disclosure. Examples of these measures include:</p>
      
          <ul class="list-disc pl-6 space-y-2">
            <li>
              <strong>Technical Measures:</strong> We use modern security technologies such as firewalls, intrusion detection systems, and encryption to protect data transmission. Personal data is stored in secure databases with strict access controls, ensuring only authorized personnel with job-specific needs can view that data.
            </li>
            <li>
              <strong>Organizational Measures:</strong> We enforce strict internal policies to ensure the proper handling of personal data. Our employees receive training on the importance of maintaining confidentiality and following best security practices. They are not permitted to disclose user data to any unauthorized party or use it in any unlawful manner. We periodically review these policies and procedures to ensure their effectiveness and alignment with evolving threats and technological developments.
            </li>
            <li>
              <strong>Security Incident Handling:</strong> Despite all preventive measures, “absolute security” on the internet cannot be guaranteed. If a security breach or vulnerability that may threaten your data is discovered, our specialized teams will immediately act to contain and remedy the incident. We will determine its cause and take the necessary steps to prevent recurrence. We will also inform the relevant authorities as required by law (e.g., SDAIA or the National Cybersecurity Authority) and notify you if you are directly affected, to ensure transparency and protect your rights.
            </li>
          </ul>
      
          <p>It is also important for users to cooperate in safeguarding their data. If you have a user account to access any private area of the site (e.g., a recruiting portal), you are responsible for keeping your username and password confidential. Please do not share your login details with anyone, and notify us immediately if you suspect any unauthorized use of your account.</p>
        `
      },
      {
        id: 'your-rights',
        title: '9. Your Rights Regarding Personal Data',
        content: `
          <p>Our Company is committed to upholding individuals’ rights concerning their personal data in line with the Saudi Personal Data Protection Law (PDPL) and other applicable legislation. Below is an overview of your rights and what each entails:</p>
      
          <ol class="list-decimal pl-6 space-y-2">
            <li>
              <strong>Right to Be Informed:</strong> You have the right to clear information about how we handle your personal data. This includes knowing the purpose for which we collect your data, how it is processed and used, how long it is retained, and the secure disposal method once the purpose is fulfilled. This policy provides that information; you may also contact us if anything is unclear.
            </li>
            <li>
              <strong>Right of Access:</strong> You may request access to your personal data that we hold. You can inquire if we maintain any of your data, request a general description of it, and be provided with a record of our data processing (within the limits allowed by law). We will provide access in an appropriate form (e.g., an electronic copy) while respecting the privacy of others and our legal obligations.
            </li>
            <li>
              <strong>Right to Obtain a Copy:</strong> In addition to mere access, you have the right to request a copy of your personal data we hold in a clear and readable format. We will supply a copy upon your request. Nominal fees may apply for repeated or excessive requests, as permitted by regulations.
            </li>
            <li>
              <strong>Right to Rectification:</strong> We are committed to keeping your data accurate and up to date. If you discover any of your personal data that we hold is incorrect or incomplete, you have the right to request its correction or update. We will correct any inaccuracy or complete any missing information without undue delay, after verifying your identity and confirming the validity of the correction request.
            </li>
            <li>
              <strong>Right to Erasure (Deletion):</strong> Where your personal data is no longer needed, or if you wish to withdraw consent (in instances where we rely on your consent to process data), you have the right to request the deletion or destruction of your personal data. We will review your request and, assuming no legal or regulatory requirement compels us to retain it (e.g., legal obligations, regulatory requirements, or to establish a legal claim), we will securely delete or destroy it in a way that prevents future retrieval.
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> When we rely on your consent to process your personal data (e.g., consent to receive notifications or to keep your data for an extended period for a specific purpose), you may withdraw that consent at any time. If you exercise this right, we will stop processing your data related to that consent from the moment of withdrawal onward. This does not affect the lawfulness of previous processing carried out with your consent before withdrawal. Note that, in some cases, withdrawing consent might prevent us from completing the service or process you requested (e.g., canceling an existing job application).
            </li>
          </ol>
      
          <p>To exercise any of the above rights, you may contact us using the details provided below and submit a clear request specifying your identity and which right you wish to exercise. We will review your request and take the necessary steps within a reasonable timeframe in accordance with applicable regulations (for instance, the Saudi PDPL may require certain requests be fulfilled within 30 days if feasible).</p>
      
          <p>We may request additional information to verify your identity before disclosing any data or making corrections, to safeguard your privacy and prevent unauthorized access. Should we deny any request, fully or partially, we will inform you of the legal reasons (e.g., a legal impediment or third-party rights) and the remedies available to you under the law.</p>
        `
      },
      {
        id: 'data-retention',
        title: '10. Data Retention',
        content: `
          <p>We will retain your personal data only for the period necessary to fulfill the purposes for which it was collected, as described in this policy, or as mandated or permitted by applicable regulations.</p>
      
          <p>For example, regarding job applications, we may retain data throughout the hiring process and for a certain time thereafter (e.g., to potentially contact you for future opportunities or to meet legal requirements).</p>
      
          <p>Once there is no longer any legal or operational need for your personal data, we will securely destroy or de-identify it so that it cannot be reconstructed.</p>
      
          <p>If at any time you wish to request data deletion, as described under the right of erasure above, you may submit a request, and we will proceed accordingly.</p>
      
          <p>Note that at present, there is no automated system on the site for users to directly delete or modify their data (such as a self-service user panel), but you can always contact us to request a manual data update or deletion, and we will process your request as required.</p>
      
          <p>We are continually developing our technical services, and we may in the future provide additional features that give users greater control over their data, at which point this policy will be updated to reflect those changes.</p>
        `
      },
      {
        id: 'childrens-privacy',
        title: '11. Children’s Privacy',
        content: `
          <p>Our site and services are not specifically directed at children (i.e., individuals under 18). We do not intentionally collect personal data from children without the consent of a parent or legal guardian.</p>
      
          <p>If you are a minor (under 18), please obtain permission from your parent or guardian before submitting any personal information on this site.</p>
      
          <p>If it comes to our attention that we have inadvertently collected personal data of a child without parental consent, we will delete such data as soon as possible.</p>
      
          <p>If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can take the appropriate action.</p>
        `
      },
      {
        id: 'privacy-liability',
        title: '12. Privacy Liability Limitations',
        content: `
          <p>We strive to protect your data to the highest possible standards, yet it’s important to recognize that transmitting information over the internet is not 100% secure. While we endeavor to protect your personal information, the Company cannot guarantee the complete security of data transmitted to our site, and any transmission is done at your own risk.</p>
      
          <p>Once we receive your data, we apply strict measures to protect it as mentioned. We are not liable for unauthorized access or data loss arising from circumstances beyond our control or from your own failure to keep your account information confidential.</p>
      
          <p>If we become aware of any breach affecting your privacy, we will act accordingly to remedy the situation and reduce any potential harm as explained in the Security section above.</p>
      
          <p>Also, note that our site may contain links to external websites not under our control. If you click on a link to a third-party site, we encourage you to review that site’s privacy policy, as we are not responsible for the privacy practices or content of other websites.</p>
        `
      },
      {
        id: 'changes',
        title: '13. Changes to the Privacy Policy',
        content: `
          <p>We may occasionally update or modify this Privacy Policy to reflect changes in our practices or to comply with new legal requirements or guidance from regulatory authorities in the Kingdom. The Company reserves the right to make such amendments at any time.</p>
      
          <p>Whenever changes occur, we will post the updated policy on this page and revise the “Last Updated” date below. Any changes take effect once published on the site, and your continued use of the site after any change is posted constitutes your implicit acceptance of the modified policy.</p>
      
          <p>We recommend periodically reviewing this Privacy Policy to stay informed about how we protect your data.</p>
      
          <p>If the changes are significant and could substantially affect your rights or our obligations regarding your data, we may additionally attempt to notify you (e.g., by an email alert if possible, or a prominent notice on the site) alongside updating this page.</p>
        `
      },
      {
        id: 'contact',
        title: '14. Contact Us',
        content: `
          <p>We welcome any inquiries or requests related to this Privacy Policy or your personal data. If you have questions about how we use your data, or you wish to exercise any of your rights mentioned above, or you believe there is a breach of this policy, you can contact us at:</p>
      
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Email:</strong> <a href="mailto:info@lubab.sa" class="text-blue-600 underline">info@lubab.sa</a></li>
          </ul>
      
          <p>We will strive to respond to your inquiry or request as quickly as possible. Your privacy matters to us, and any request regarding the protection of your personal data is a priority that we take seriously.</p>
        `
      },
    ];

  return (
    <div className="flex justify-center bg-gray-100 p-6 font-nizar-regular text-dark-gray text-justify" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-[21cm] bg-white shadow-lg min-h-[29.7cm] flex flex-col">
        {/* Document Header */}
        <div className="p-8 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</h1>
              {/* <p className="mt-2 text-sm text-gray-600">Last Updated: April 21, 2025</p> */}
            </div>
          </div>
        </div>

        {/* Document Body */}
        <div className="flex-1 p-8">
  {(isArabic ? sectionsAr : sections).map((section) => (
    <div key={section.id} className="mb-6" id={section.id}>
      <h2 className="text-xl font-semibold mb-3 text-secondary-blue">
        {section.title}
      </h2>
      <div
        className="text-gray-700 leading-relaxed"
        dir={isArabic ? 'rtl' : 'ltr'}
        dangerouslySetInnerHTML={{ __html: section.content }}
      ></div>
    </div>
  ))}
</div>

{/* Document Footer */}
<div className="p-8 border-t border-gray-200 mt-auto">
  <div className="flex justify-between items-center">
    <p className="text-sm text-gray-600">
      © 2025 Lubab CIT Ltd. All rights reserved.
    </p>
  </div>
</div>

{/* Print Button */}
<div className="fixed bottom-6 right-6">
  <button 
    onClick={() => window.print()}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
  >
    {isArabic ? 'طباعة السياسة' : 'Print Policy'}
  </button>
      </div>
    </div>
    </div>
  );
}