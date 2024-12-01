export default function Info() {
  return (
    <>
      <div>
        <h2>طريقة اللعب:</h2>
        <p>
          اللعبة بتتقسم لـ "ليل" و"نهار".
          <br />
          بالليل، كل الأدوار بتتحرك في سرية:
          <br />
          <span className="ml-4">- المافيا يقرروا مين هيقتلوا.</span>
          <br />
          <span className="ml-4">- الدكتور يختار مين يعالجه.</span>
          <br />
          <span className="ml-4">- المفتش يختار مين يتحقق منه.</span>
          <br />
          بالنهار، الكل بيصحى ويناقش مين ممكن يكون المافيا بناءً على اللي حصل
          بالليل. الناس بتصوت عشان يخرجوا شخص من اللعبة (باعتبار إنه مافيا).
        </p>
      </div>
      <div>
        <h2>الفوز:</h2>
        <p>
          <span className="font-bold">المافيا تكسب:</span> لو عدد المافيا بقى
          مساوي لعدد المواطنين.
          <br />
          <span className="font-bold">المواطنين يكسبوا:</span> لو اكتشفوا كل
          المافيا وطردوهم من اللعبة.
        </p>
      </div>
    </>
  );
}
