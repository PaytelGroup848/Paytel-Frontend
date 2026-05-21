import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  MapPin,
  Quote,
  ServerCog,
  Star,
  Users,
} from 'lucide-react';

const reviews = [
  {
    name: 'Rohit Sharma',
    role: 'Owner',
    company: 'Sharma Trading Co.',
    location: 'Delhi',
    rating: 5,
    review:
      'Earlier our Tally data was available only on one office computer. After moving to cloud, my accountant and I can access the same data from different locations without disturbing daily billing.',
    result: '3 users working together',
  },
  {
    name: 'Priya Nair',
    role: 'Finance Manager',
    company: 'Nair Foods Pvt. Ltd.',
    location: 'Kochi',
    rating: 5,
    review:
      'The cloud setup made month-end work much smoother. Reports open quickly, backup is handled properly and our branch team can coordinate with accounts without sending files again and again.',
    result: 'Faster branch reporting',
  },
  {
    name: 'Amit Patel',
    role: 'Director',
    company: 'Patel Ceramics',
    location: 'Ahmedabad',
    rating: 4,
    review:
      'We wanted a simple way to use Tally from factory and office. The plan was explained clearly, setup was neat and our staff did not need to learn a new accounting system.',
    result: 'Office and factory access',
  },
  {
    name: 'Sneha Iyer',
    role: 'Accounts Head',
    company: 'Iyer Textiles',
    location: 'Bengaluru',
    rating: 5,
    review:
      'Performance has been stable for daily entries, GST work and invoice checking. The biggest benefit is that we no longer worry about one local system failure stopping all accounts work.',
    result: 'Reliable daily accounting',
  },
  {
    name: 'Manish Gupta',
    role: 'Partner',
    company: 'Gupta & Sons Distributors',
    location: 'Jaipur',
    rating: 5,
    review:
      'Our sales and accounts teams needed controlled access to Tally. Cloud access helped us manage users better and reduced dependency on office hardware maintenance.',
    result: 'Controlled user access',
  },
  {
    name: 'Farhan Khan',
    role: 'Operations Lead',
    company: 'Khan Logistics',
    location: 'Mumbai',
    rating: 4,
    review:
      'We use Tally for billing and business reports. Cloud access helped our team check data from different locations, especially when travel or branch work is involved.',
    result: 'Better remote coordination',
  },
];

const metrics = [
  {
    icon: Users,
    value: '3-25',
    label: 'User plans',
  },
  {
    icon: Clock3,
    value: 'Daily',
    label: 'Backup support',
  },
  {
    icon: ServerCog,
    value: 'Cloud',
    label: 'Optimized setup',
  },
];

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 rating`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          className={index < rating ? 'fill-slate-900 text-slate-900' : 'text-slate-300'}
        />
      ))}
    </div>
  );
}

export default function TallyReview() {
  return (
    <section className="w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-3 sm:p-5 lg:p-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:p-7 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div className="min-w-0">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold uppercase text-slate-200">
                  <Quote size={15} className="text-slate-300" />
                  Customer Reviews
                </div>

                <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Indian businesses trust cloud access for daily Tally work
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                  See how growing teams use Tally on Cloud to simplify access, improve continuity
                  and reduce dependency on local office systems.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {metrics.map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 text-slate-200">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-lg font-extrabold text-white">{value}</p>
                      <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={`${review.name}-${review.company}`}
                className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
              >
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <div className="min-w-0">
                    <RatingStars rating={review.rating} />
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      "{review.review}"
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500">
                    <Quote size={18} />
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-extrabold text-white">
                      {review.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-extrabold text-slate-950">
                        {review.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {review.role}, {review.company}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          <MapPin size={13} />
                          {review.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          <Building2 size={13} />
                          {review.result}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="min-w-0">
              <h3 className="text-2xl font-extrabold text-slate-950">
                Ready to check the right Tally cloud plan?
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {['Free demo', 'Plan guidance', 'Setup support'].map((item) => (
                  <div key={item} className="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={17} className="shrink-0 text-slate-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#demo"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-extrabold text-white transition hover:bg-slate-800 sm:w-auto"
            >
              Book Free Demo
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}