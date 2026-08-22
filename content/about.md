# About Heisenbug

Heisenbug is a security company focused on one problem: npm supply-chain attacks that pass every static scanner. Our product, Goodman, is an open-source eBPF sensor that runs on your own infrastructure and watches what your dependencies actually do at runtime. It attributes every security-relevant system call to the exact npm package and version that caused it, learns a behavioral baseline for each package version it observes, and alerts within seconds when a dependency starts doing something it has never done before.

We take our name from Heisenberg's uncertainty principle and the classic notion of a heisenbug: a defect that changes or vanishes when you try to observe it directly. Runtime threats are the same shape. You cannot catch them by reading files at build time; you have to observe systems while they run, without changing their behavior. That is why Goodman is built on eBPF, adds no sidecars, requires no agents inside application code, and is designed to run in production with negligible overhead.

The company operates as Heisenbug Private Limited, registered in Mumbai, Maharashtra, India, with an engineering team distributed across India. We work in the open wherever we can: Goodman is Apache-2.0 licensed, its end-to-end attack replay suite is public, and our roadmap and incident write-ups are published in our blog.

## Legal entity

Heisenbug Private Limited
6th Floor, Lightbridge, Hiranandani Business Park
Mumbai, Maharashtra 400072, India

## Contact

- Email: hi@heisenbug.ai
- GitHub: https://github.com/hi-heisenbug
- X: https://x.com/hi_heisenbug
- LinkedIn: https://www.linkedin.com/company/hi-heisenbug/

If you are evaluating runtime dependency security for a production Node.js fleet, or you found a behavior-drift alert confusing, we want to hear from you at hi@heisenbug.ai.
